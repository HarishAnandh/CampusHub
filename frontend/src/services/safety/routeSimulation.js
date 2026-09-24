const campusGraph = {
    MainGate: {
      LibraryJunction: 4,
      SportsGround: 6,
    },
  
    LibraryJunction: {
      MainGate: 4,
      AuditoriumRoad: 3,
      HostelBlock: 5,
    },
  
    SportsGround: {
      MainGate: 6,
      AuditoriumRoad: 4,
      Cafeteria: 5,
    },
  
    AuditoriumRoad: {
      LibraryJunction: 3,
      SportsGround: 4,
      ExitGate: 3,
    },
  
    HostelBlock: {
      LibraryJunction: 5,
      Cafeteria: 3,
      ExitGate: 6,
    },
  
    Cafeteria: {
      SportsGround: 5,
      HostelBlock: 3,
      ExitGate: 4,
    },
  
    ExitGate: {
      AuditoriumRoad: 3,
      HostelBlock: 6,
      Cafeteria: 4,
    },
  };
  
  function dijkstra(graph, start, destination, blockedRoute) {
    const distances = {};
    const previous = {};
    const unvisited = new Set(Object.keys(graph));
  
    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      previous[node] = null;
    });
  
    distances[start] = 0;
  
    while (unvisited.size > 0) {
      let currentNode = null;
  
      for (const node of unvisited) {
        if (
          currentNode === null ||
          distances[node] < distances[currentNode]
        ) {
          currentNode = node;
        }
      }
  
      if (currentNode === null || distances[currentNode] === Infinity) {
        break;
      }
  
      unvisited.delete(currentNode);
  
      if (currentNode === destination) {
        break;
      }
  
      for (const [neighbor, weight] of Object.entries(graph[currentNode])) {
        if (neighbor === blockedRoute || currentNode === blockedRoute) {
          continue;
        }
  
        if (!unvisited.has(neighbor)) {
          continue;
        }
  
        const newDistance = distances[currentNode] + weight;
  
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentNode;
        }
      }
    }
  
    const path = [];
    let current = destination;
  
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
  
    if (path.length === 0 || path[0] !== start) {
      return {
        path: [],
        distance: Infinity,
        available: false,
      };
    }
  
    return {
      path,
      distance: distances[destination],
      available: true,
    };
  }
  
  export function simulateRoute({
    crowdSize,
    venueArea,
    entryPoints,
    exitPoints,
    roadWidth,
    walkingSpeed,
    blockedRoute,
  }) {
    const density = crowdSize / Math.max(venueArea, 1);
  
    const flowRate =
      density *
      walkingSpeed *
      roadWidth *
      Math.max(exitPoints, 1);
  
    const routeResult = dijkstra(
      campusGraph,
      "MainGate",
      "ExitGate",
      blockedRoute === "None" ? null : blockedRoute
    );
  
    let congestion = "Low";
  
    if (density >= 6 && density < 8) {
      congestion = "Moderate";
    } else if (density >= 8 && density < 10) {
      congestion = "High";
    } else if (density >= 10) {
      congestion = "Critical";
    }
  
    const bottleneck =
      entryPoints <= 1 || exitPoints <= 1
        ? "Limited entry or exit capacity"
        : density >= 8
          ? "High crowd density"
          : "No major bottleneck detected";
  
    return {
      density,
      flowRate,
      congestion,
      bottleneck,
      route: routeResult,
      estimatedTravelTime:
        routeResult.distance === Infinity
          ? null
          : routeResult.distance / Math.max(walkingSpeed, 0.1),
    };
  }