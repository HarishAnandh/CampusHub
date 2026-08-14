const API_URL = import.meta.env.VITE_API_URL;

export async function getClubs() {
  const response = await fetch(`${API_URL}/api/clubs`);

  if (!response.ok) {
    throw new Error("Failed to fetch clubs");
  }

  return response.json();
}

export async function createClub(club) {
  const response = await fetch(`${API_URL}/api/clubs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(club),
  });

  if (!response.ok) {
    throw new Error("Failed to create club");
  }

  return response.json();
}

export async function getClubPosts(clubId) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/posts`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function createClubPost(clubId, post) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/posts`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(post),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

export async function getClubEvents(clubId) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/events`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export async function createClubEvent(clubId, event) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/events`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  return response.json();
}


export async function getPolls() {
  const response = await fetch(
    `${API_URL}/api/polls`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch polls");
  }

  return response.json();
}


export async function createPoll(poll) {
  const response = await fetch(`${API_URL}/api/polls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poll),
  });

  const data = await response.json();

  console.log("CREATE POLL STATUS:", response.status);
  console.log("CREATE POLL RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data.detail || `Failed to create poll (${response.status})`
    );
  }

  return data;
}


export async function votePoll(pollId, optionId) {
  const response = await fetch(
    `${API_URL}/api/polls/${pollId}/vote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        option_id: optionId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit vote");
  }

  return response.json();
}

// -------------------------
// Authentication
// -------------------------

export async function registerUser(user) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}


export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


// -------------------------
// Club Management
// -------------------------

export async function updateClub(clubId, club) {
  const response = await fetch(`${API_URL}/api/clubs/${clubId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(club),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update club");
  }

  return data;
}


export async function joinClub(clubId, username) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/join?username=${encodeURIComponent(username)}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to join club");
  }

  return data;
}


export async function leaveClub(clubId, username) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/join?username=${encodeURIComponent(username)}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to leave club");
  }

  return data;
}


export async function getClubMembers(clubId) {
  const response = await fetch(
    `${API_URL}/api/clubs/${clubId}/members`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch club members");
  }

  return data;
}


export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch users");
  }

  return data;
}