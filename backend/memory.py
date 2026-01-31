# simple in-memory session store
_sessions = {}

def get_session(session_id: str):
    return _sessions.get(session_id)

def save_session(session_id: str, data: str):
    _sessions[session_id] = data

