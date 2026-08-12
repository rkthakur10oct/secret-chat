import { useEffect, useState } from "react"
import Auth from "./pages/Auth"
import Lobby from "./pages/Lobby"
import GameRoom from "./pages/GameRoom"
import Leaderboard from "./pages/Leaderboard"
import ResultScreen from "./components/ResultScreen"

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [screen, setScreen] = useState("lobby")
  const [game, setGame] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => {
    setAuthenticated(Boolean(localStorage.getItem("access_token")))
  }, [])

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setAuthenticated(false)
    setGame(null)
    setResult(null)
    setScreen("lobby")
  }

  if (!authenticated) {
    return <Auth onSuccess={() => setAuthenticated(true)} />
  }

  if (screen === "leaderboard") {
    return <Leaderboard onBack={() => setScreen("lobby")} />
  }

  if (screen === "game" && game) {
    return (
      <>
        <GameRoom
          game={game}
          onBack={() => {
            setResult(null)
            setGame(null)
            setScreen("lobby")
          }}
          onResult={setResult}
        />

        {result && (
          <ResultScreen
            result={result}
            onClose={() => {
              setResult(null)
              setGame(null)
              setScreen("lobby")
            }}
            onLeaderboard={() => {
              setResult(null)
              setGame(null)
              setScreen("leaderboard")
            }}
          />
        )}
      </>
    )
  }

  return (
    <Lobby
      onSelectGame={(selectedGame) => {
        setGame(selectedGame)
        setScreen("game")
      }}
      onLeaderboard={() => setScreen("leaderboard")}
      onLogout={logout}
    />
  )
}

export default App