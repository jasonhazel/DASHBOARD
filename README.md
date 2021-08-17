# **DASHBOARD**

**DASHBOARD** aims to consolidate the management of multiple applications into a simple interface. 

_this is far from production ready_

## Caveats
- This application doesn't have a backend yet.
  - Everything is stored in the browser localStorage
  - Settings to not persist across devices or browsers.

## Cards
- Sonarr
  - List episodes coming in next 7 days
  - List currently downloading episodes with progress

## Docker
```
docker run -p 8008:80 mrhazel/dashboard
```
open [http://localhost:8008](http://localhost:8008)

