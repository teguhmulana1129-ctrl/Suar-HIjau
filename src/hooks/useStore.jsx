import { useState, useCallback, useEffect, useContext, createContext } from 'react';

const API_BASE = 'http://localhost:3000/api';

const StoreContext = createContext(null);

// Helper to safely parse JSON from a response
async function safeJson(res) {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

export function StoreProvider({ children }) {
    const [data, setData] = useState({
        programs: [],
        products: [],
        events: [],
        news: [],
        team: [],
        admins: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const [programsRes, productsRes, eventsRes, newsRes, teamRes, adminsRes] = await Promise.all([
                fetch(`${API_BASE}/programs`),
                fetch(`${API_BASE}/products`),
                fetch(`${API_BASE}/events`),
                fetch(`${API_BASE}/news`),
                fetch(`${API_BASE}/team`),
                fetch(`${API_BASE}/admins`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                })
            ]);

            if (!programsRes.ok || !productsRes.ok || !eventsRes.ok || !newsRes.ok || !teamRes.ok || !adminsRes.ok) {
                throw new Error('Gagal mengambil data dari server');
            }

            const [programs, products, events, news, team, admins] = await Promise.all([
                safeJson(programsRes),
                safeJson(productsRes),
                safeJson(eventsRes),
                safeJson(newsRes),
                safeJson(teamRes),
                safeJson(adminsRes)
            ]);

            setData({
                programs: programs || [],
                products: products || [],
                events: events || [],
                news: news || [],
                team: team || [],
                admins: admins || []
            });
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch initial data
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addItem = useCallback(async (collection, item) => {
        try {
            const res = await fetch(`${API_BASE}/${collection}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(item)
            });
            if (!res.ok) {
                const errData = await safeJson(res);
                throw new Error(errData?.error || `Gagal menambah ${collection}`);
            }
            const newItem = await safeJson(res);
            if (!newItem) throw new Error(`Gagal menambah ${collection}: respons kosong`);

            setData(prev => ({
                ...prev,
                [collection]: [newItem, ...prev[collection]]
            }));
            return newItem;
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }, []);

    const updateItem = useCallback(async (collection, id, updates) => {
        try {
            const res = await fetch(`${API_BASE}/${collection}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updates)
            });
            if (!res.ok) {
                const errData = await safeJson(res);
                throw new Error(errData?.error || `Gagal update ${collection}`);
            }
            const updatedItem = await safeJson(res);
            if (!updatedItem) throw new Error(`Gagal update ${collection}: respons kosong`);

            setData(prev => ({
                ...prev,
                [collection]: prev[collection].map(item => item.id === id ? updatedItem : item)
            }));
            return updatedItem;
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }, []);

    const deleteItem = useCallback(async (collection, id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                const res = await fetch(`${API_BASE}/${collection}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!res.ok) throw new Error(`Gagal hapus ${collection}`);

                setData(prev => ({
                    ...prev,
                    [collection]: prev[collection].filter(item => item.id !== id)
                }));
            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        }
    }, []);

    // Helper: convert MinIO object key to displayable URL
    const getImageUrl = useCallback((imageKey) => {
        if (!imageKey) return null;
        // Jika berupa base64 data URL, langsung pakai
        if (imageKey.startsWith('data:')) return imageKey;
        // Jika image menyimpan URL CDN lama, ekstrak object key-nya (images/xxx.png)
        if (imageKey.includes('/suarhijau/')) {
            // Bisa dari cdn.kediritechnopark.com atau cdn-api.kediritechnopark.com:9002
            const extractedKey = imageKey.split('/suarhijau/')[1].split('?')[0]; // buang query params kalau ada
            return `${API_BASE}/image?key=${extractedKey}`;
        }
        // Jika sudah berupa full URL eksternal (selain MinIO kita), langsung pakai
        if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) return imageKey;

        // Jika berupa MinIO object key murni, proxy melalui backend
        return `${API_BASE}/image?key=${imageKey}`;
    }, []);

    const value = {
        data,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
        refreshData: fetchData,
        getImageUrl
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
