import { getSubdomain, getSubdomainUrl, isPublicDomain } from './subdomain';

/**
 * Checks if the current URL is a tenant subdomain
 * @returns {boolean}
 */
export const isTenantSubdomain = () => {
    const subdomain = getSubdomain();
    return subdomain && subdomain !== 'www' && subdomain !== 'console';
};

/**
 * Checks if the current URL is the marketing site (bare domain or www)
 * @returns {boolean}
 */
export const isMarketingSite = () => {
    return isPublicDomain();
};

/**
 * Extracts the tenant slug/ID from the subdomain
 * @returns {string|null}
 */
export const getCurrentTenantId = () => {
    if (isTenantSubdomain()) {
        return getSubdomain();
    }
    return null;
};

/**
 * Redirects the user to the tenant's login page
 * @param {string} tenantId - The tenant slug/ID
 */
export const redirectToTenantLogin = (tenantId) => {
    const url = getSubdomainUrl(tenantId, '/login');
    window.location.href = url;
};

/**
 * Redirects to the global sign-in page on the marketing site
 */
export const redirectToGlobalSignIn = () => {
    // In development with localhost, we need to be careful.
    // getSubdomainUrl(null, '/signin') handles "null" as bare domain.
    const url = getSubdomainUrl(null, '/signin');
    window.location.href = url;
};
