# Google Tag Manager and GA4

Fexkode uses Google Tag Manager container `GTM-NJPLTMH6`. GA4 measurement ID `G-SB48CTPGKJ` must be configured in that container, not in the site source code.

## Required GTM configuration

1. Create or update a Google tag in `GTM-NJPLTMH6` with measurement ID `G-SB48CTPGKJ`.
2. Fire it on the **Initialization - All Pages** trigger. Keep its automatic initial page view enabled.
3. Create a Custom Event trigger for `fexkode_route_change` and use it to fire a GA4 Event tag named `page_view` with these event parameters:
   - `page_location`: `{{DLV - page_location}}`
   - `page_path`: `{{DLV - page_path}}`
   - `page_title`: `{{DLV - page_title}}`
4. Create the three Data Layer Variables shown above if they do not already exist, then preview and publish the container.

The site intentionally sends no direct GA4 configuration calls. GTM handles the first page view, while the React app emits `fexkode_route_change` only after client-side navigation, preventing duplicate initial page views.

## Verification

Use GTM Preview to confirm one Google tag fires on the initial load and one `page_view` event fires for each later route change. Then confirm the events in GA4 DebugView or Realtime.
