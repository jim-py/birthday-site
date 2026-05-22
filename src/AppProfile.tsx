import BottomNav from "./NavBar"

export default function AppProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="text-3xl font-semibold">Профиль</div>
        <div className="text-sm mt-2 text-white/50">Coming soon</div>
      </div>

      <BottomNav />
    </div>
  );
}