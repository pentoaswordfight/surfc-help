import type { Router } from 'vitepress'

// Mirrors the PostHog init pattern used in surfc-web/src/layouts/BaseLayout.astro:
// shares the same project so marketing → waitlist → sign-up → help → app stays
// one funnel. Token may be empty in local dev — we no-op in that case so dev
// servers don't pollute analytics.
//
// Cookie domain is set to `.surfc.app` so a distinct_id created on the marketing
// site or in the app continues across subdomains. Falsy in local dev.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posthog?: any
  }
}

export function initPostHog(router: Router): void {
  const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN as string | undefined
  const host =
    (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
    'https://eu.i.posthog.com'

  if (!token) return
  if (window.posthog?.__loaded) return

  // Snippet copied verbatim from posthog.com/docs/libraries/js (matches surfc-web).
  /* eslint-disable */
  // prettier-ignore
  ;(function(t: any,e: any){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i: any,s: any,a: any){function g(t: any,e: any){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t: any){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)})(document, window.posthog || []);
  /* eslint-enable */

  window.posthog.init(token, {
    api_host: host,
    capture_pageview: false, // VitePress is a SPA — we fire pageviews from the router hook below
    cross_subdomain_cookie: true,
    persistence: 'localStorage+cookie',
    session_recording: { maskAllInputs: true },
  })

  // Initial pageview after init — the snippet doesn't fire one when capture_pageview is false.
  window.posthog.capture('$pageview')

  router.onAfterRouteChange = () => {
    window.posthog?.capture('$pageview')
  }
}
