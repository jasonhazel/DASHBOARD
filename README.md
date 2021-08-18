# **DASHBOARD**

**DASHBOARD** aims to consolidate the management of multiple applications into a simple interface. 

_this is far from production ready_

## Caveats
- The backend is only for storing card settings.  API calls to applications are done in the browser.

## Cards
- Sonarr
  - List episodes coming in next 7 days
  - List currently downloading episodes with progress
- Radarr
  - List movie releases coming in next 30 days

## Docker
```
docker run -p 8008:80 mrhazel/dashboard
```
open [http://localhost:8008](http://localhost:8008)

