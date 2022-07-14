function load_graph() {
    let elements = map_data["elements"];

    let nodes = {};
    elements.filter(el => el.type === "node").forEach(el => {
        nodes[el.id] = el;
    });

    let graph_data = [];
    let c = 0;

    elements.filter(el => el.type === "way" && el.show === true).forEach(way => {
        let way_nodes = way["nodes"];
        for(let i = 0; i < way_nodes.length - 1; i++) {
            let current_node = nodes[way_nodes[i]];
            let next_node = nodes[way_nodes[i+1]];
            let data = {
                "type" : "Feature",
                "req" :"true",
                "geometry" : {
                    "type" : "LineString",
                    "coordinates" : [[current_node["lon"], current_node["lat"]], [next_node["lon"], next_node["lat"]]]
                }
            };
            data["req"] = c === 0 ? "true" : "false";
            graph_data.push(data);

            c = 1 - c;
        }
    });

    // console.log(graph_data);
    return graph_data;
}

let graph_data = load_graph();