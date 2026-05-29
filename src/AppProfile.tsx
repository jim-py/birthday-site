import BottomNav from "./NavBar";
import Ksushka from "../src/photos/Ksushka.png";

export default function AppProfile() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-24">
      {/* Верхний блок профиля */}
      <div className="w-full max-w-md mt-8 px-4">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          {/* Фото */}
          <div className="w-full mt-10 h-[320px] overflow-hidden">
            <img
              src={Ksushka}
              alt="Ksushka"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Информация */}
          <div className="p-6">
            {/* Разделитель */}
            <div className="w-full h-px bg-white/10 my-5" />

            {/* Блок с подписями */}
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-sm text-white/40">Общая информация</div>
                <div className="text-base font-medium mt-1">
                  Друзья, нас ждёт классный день с активностями, танцами и
                  хорошей компанией ✨
                  <p />
                  Чтобы всем было комфортно и весело, вот несколько
                  организационных моментов:
                  <p className="p-2" />
                  👕 Возьмите сменную одежду: отдельно для активного отдыха и
                  для мини-фотосессии, хотелось бы запечатлить этот день
                  <p />
                  👗 Дресс-кода нет — приходите в том, в чём вам комфортно. Но
                  девочкам предпочтительно быть в платьях для красивых
                  фотографий ✨
                  <p />
                  🥂 Алкоголь каждый покупает себе самостоятельно — берите то,
                  что любите
                  <p />
                  🌙 Если захотите остаться с ночёвкой — будем очень рады 😊
                  <p className="p-2" />
                  Прошу накидать музыку, чтобы было поразнообразнее, спасибо)
                  Точный ответ придёте или нет дать до 15 июня.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя навигация */}
      <BottomNav />
    </div>
  );
}
