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

    if (
      currentNode === null ||
      distances[currentNode] === Infinity
    ) {
      break;
    }

    unvisited.delete(currentNode);

    if (currentNode === destination) {
      break;
    }

    for (const [neighbor, weight] of Object.entries(
      graph[currentNode]
    )) {
      if (
        neighbor === blockedRoute ||
        currentNode === blockedRoute
      ) {
        continue;
      }

      if (!unvisited.has(neighbor)) {
        continue;
      }

      const newDistance =
        distances[currentNode] + weight;

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


/* ------------------------------------------
   Find available evacuation branches
------------------------------------------ */

function getDecisionBranches(
  graph,
  start,
  destination,
  blockedRoute
) {
  const branches = [];

  const neighbors = Object.keys(graph[start]);

  for (const neighbor of neighbors) {
    if (neighbor === blockedRoute) {
      continue;
    }

    const result = dijkstra(
      graph,
      neighbor,
      destination,
      blockedRoute
    );

    if (result.available) {
      branches.push({
        node: neighbor,
        distance:
          graph[start][neighbor] + result.distance,
        route: [
          start,
          ...result.path,
        ],
      });
    }
  }

  branches.sort(
    (a, b) => a.distance - b.distance
  );

  return branches;
}


/* ------------------------------------------
   Main simulation
------------------------------------------ */

export function simulateRoute({
  crowdSize,
  venueArea,
  entryPoints,
  exitPoints,
  roadWidth,
  walkingSpeed,
  emergencyResponseTime,
  blockedRoute,
}) {
  const density =
    crowdSize / Math.max(venueArea, 1);

  const flowRate =
    density *
    walkingSpeed *
    roadWidth *
    Math.max(exitPoints, 1);


  const blocked =
    blockedRoute === "None"
      ? null
      : blockedRoute;


  /* ----------------------------------------
     Calculate main evacuation route
  ---------------------------------------- */

  const routeResult = dijkstra(
    campusGraph,
    "MainGate",
    "ExitGate",
    blocked
  );


  /* ----------------------------------------
     Calculate decision branches
  ---------------------------------------- */

  const decisionBranches =
    getDecisionBranches(
      campusGraph,
      "MainGate",
      "ExitGate",
      blocked
    );


  /* ----------------------------------------
     Congestion
  ---------------------------------------- */

  let congestion = "Low";

if (density >= 2 || flowRate >= 8) {
  congestion = "Moderate";
}

if (density >= 4 || flowRate >= 15) {
  congestion = "High";
}

if (density >= 6 || flowRate >= 25) {
  congestion = "Critical";
}


  /* ----------------------------------------
     Bottleneck
  ---------------------------------------- */

  const bottleneck =
    entryPoints <= 1 ||
    exitPoints <= 1
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

    /* New information for the map */
    decisionBranches,

    blockedRoute,

    entryPoints,
    exitPoints,

    emergencyResponseTime,

    estimatedTravelTime:
      routeResult.distance === Infinity
        ? null
        : routeResult.distance /
          Math.max(walkingSpeed, 0.1),
  };
}