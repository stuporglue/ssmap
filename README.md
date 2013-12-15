Stupid Simple Map
=================

One line Javascript maps, featuring Leaflet.

Leaflet maps are already pretty easy to use, but what if you want it EVEN EASIER?

The stupid simple map puts a leaflet map on your web page, automatically loading Leaflet if needed.

It defaults to a 500px square map of the world, centered at (0,0). You can change:

 * The zoom
 * The center
 * Map dimensions
 * Which basemap to use (street or satelite view)
 * If a marker is placed at the centerpoint of the map


Usage
-----

Simply put this line in your HTML where you want a map to appear:

    <script src='ssmap-min.js'></script>

You can also specify several options:

    <script src='ssmap-min.js?lat=-90&lon=45&z=8&mark=true&tiles=map&w=50%'></script>

Options
-------

All options are optional. If you do not provide an option, one will be provided for you.

    lat       : latitude (decimal degrees)
    lon       : longitude
    div       : the div to place the map in  (string)
    h         : height of the map div (including units. eg 500px)
    w         : width of the map div
    z         : map zoom level. 1-18
    tiles     : basemap to use. 'sat' or 'map'
    mark      : create a marker on the center of the map? (true or false). Defaults to true if the center is not 0,0
