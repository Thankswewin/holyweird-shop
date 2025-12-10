/**
 * API Service for HolyWeird Frontend
 * Handles all communication with the backend
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new Error(error.message || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// =============================================
// PRODUCTS API
// =============================================

export const productsAPI = {
    /**
     * Get all products with optional filtering
     */
    async getAll(filters = {}) {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.material) params.append('material', filters.material);
        if (filters.stock_status) params.append('stock_status', filters.stock_status);

        const query = params.toString() ? `?${params.toString()}` : '';
        return apiFetch(`/products${query}`);
    },

    /**
     * Get single product by slug
     */
    async getBySlug(slug) {
        return apiFetch(`/products/${slug}`);
    },
};

// =============================================
// CHECKOUT API
// =============================================

export const checkoutAPI = {
    /**
     * Create a Stripe checkout session
     */
    async createSession(items, customerEmail, customConfig = null) {
        return apiFetch('/checkout/create-session', {
            method: 'POST',
            body: JSON.stringify({ items, customerEmail, customConfig }),
        });
    },

    /**
     * Get checkout session details
     */
    async getSession(sessionId) {
        return apiFetch(`/checkout/session/${sessionId}`);
    },
};

// =============================================
// DOLLY BUILDER API
// =============================================

export const dollyAPI = {
    /**
     * Save a Dolly configuration
     */
    async saveConfig(config, totalPrice, userEmail = null) {
        return apiFetch('/dolly/save-config', {
            method: 'POST',
            body: JSON.stringify({ config, totalPrice, userEmail }),
        });
    },

    /**
     * Get a saved configuration by share ID
     */
    async getConfig(shareId) {
        return apiFetch(`/dolly/config/${shareId}`);
    },
};

// =============================================
// CONCIERGE API
// =============================================

export const conciergeAPI = {
    /**
     * Submit a concierge request
     */
    async submitRequest(data) {
        return apiFetch('/concierge/request', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};

// =============================================
// HEALTH CHECK
// =============================================

export const healthAPI = {
    async check() {
        return apiFetch('/health');
    },
};

export default {
    products: productsAPI,
    checkout: checkoutAPI,
    dolly: dollyAPI,
    concierge: conciergeAPI,
    health: healthAPI,
};
