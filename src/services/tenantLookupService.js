import api from './api';

const tenantLookupService = {
    /**
     * Find tenants associated with an email or identifier
     * @param {string} identifier - Email or phone number
     * @returns {Promise<{success: boolean, tenants: Array<{id: string, name: string, type: string, login_url: string, slug?: string}>}>}
     */
    findTenant: async (identifier) => {
        try {
            const response = await api.post('/auth/lookup-tenant', { identifier });

            // Backend returns { success: true, tenants: [...] }
            // Ensure we handle the response structure correctly

            // Helper to extract slug from login_url if slug is missing
            const tenants = response.data.tenants ? response.data.tenants.map(t => {
                if (!t.slug && t.login_url) {
                    try {
                        const url = new URL(t.login_url);
                        const hostname = url.hostname; // e.g. tenant.localhost
                        const parts = hostname.split('.');
                        if (parts.length >= 2) {
                            // Assuming first part is slug
                            t.slug = parts[0];
                        }
                    } catch (e) {
                        console.error("Error parsing login_url", e);
                    }
                }
                return t;
            }) : [];

            return { ...response.data, tenants };

        } catch (error) {
            console.error("Tenant lookup failed", error);

            // If 404 or 400, return success: false with message
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                return { success: false, message: error.response.data.message || 'No account found.' };
            }
            throw error;
        }
    }
};

export default tenantLookupService;
