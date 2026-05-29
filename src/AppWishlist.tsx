import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExternalLink, Bookmark } from "lucide-react";
import BottomNav from "./NavBar"
import Markers from "../src/photos/Markers.webp";
import Pixar from "../src/photos/Pixar.webp";
import SisterVeter from "../src/photos/SisterVeter.jpg";
import SisterLuna from "../src/photos/SisterLuna.jpg";
import Love from "../src/photos/Love.webp";
import Vois from "../src/photos/Vois.webp";
import Money from "../src/photos/Money.jpg";

type WishlistItem = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
};

type Reservation = {
  item_id: number;
  reserved_by: string;
};

const items: WishlistItem[] = [
  {
    id: 1,
    title: "Маркеры акриловые набор 240 цветов",
    description:
      "",
    price: "~ 4 900 ₽",
    image:
      Markers,
    link: "https://www.wildberries.ru/catalog/447234305/detail.aspx",
  },
  {
    id: 2,
    title: "Раскраска по номерам Disney Best Of Pixar",
    description: "",
  price: "~ 2 200 ₽",
    image:
      Pixar,
    link: "https://www.wildberries.ru/catalog/484664896/detail.aspx?size=676214380",
  },
  {
    id: 3,
    title: "Л. Райли. Сестра ветра",
    description: "Хочется именно это коллекционное издание, обязательно в этой обложке. Необязательно из этого объявления",
    price: "~ 3 200 ₽",
    image:
      SisterVeter,
    link: "https://www.avito.ru/sankt-peterburg/knigi_i_zhurnaly/l._rayli._sestra_vetra_8160270510",
  },
  {
    id: 4,
    title: "Л. Райли. Сестра луны",
    description: "Хочется именно это коллекционное издание, обязательно в этой обложке. Необязательно из этого объявления",
    price: "~ 3 300 ₽",
    image:
      SisterLuna,
    link: "https://www.avito.ru/sankt-peterburg/knigi_i_zhurnaly/lyusinda_rayli_sem_sester_sestra_luny_8118073485",
  },
  {
    id: 5,
    title: "Алмазная мозаика Любовь",
    description: "",
    price: "~ 700 ₽",
    image:
      Love,
    link: "https://www.wildberries.ru/catalog/556129207/detail.aspx",
  },
  {
    id: 6,
    title: "Свой подарок",
    description: "",
    price: "~ ₽",
    image:
      Vois,
    link: "https://ru.pinterest.com/pin/9359111720515513",
  },
  {
    id: 7,
    title: "Деньгами",
    description: "",
    price: "~ ₽",
    image:
      Money,
    link: "https://ru.pinterest.com/pin/756041856236485301/",
  },
];

function Wishlist() {
  const { id } = useParams();
  const [reservations, setReservations] =
  useState<Reservation[]>([]);

const handleReserve = async (itemId: number) => {
  try {
    await fetch(
      "/api/wishlist/reserve",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservedBy: id,
          itemId,
        }),
      }
    );

    await loadReservations();
  } catch (err) {
    console.error(err);
  }
};

const handleCancelReservation = async (
  itemId: number
) => {
  await fetch(
    "/api/wishlist/reserve",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservedBy: id,
        itemId,
      }),
    }
  );

  await loadReservations();
};

const loadReservations = async () => {
  const response = await fetch(
    "/api/wishlist/reservations"
  );

  const data = await response.json();

  setReservations(data);
};

useEffect(() => {
  loadReservations();
}, []);

const getReservation = (itemId: number) =>
  reservations.find(
    (reservation) => reservation.item_id === itemId
  );

  return (
    <div className="pb-20 min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-zinc-900 p-3 text-white dark:bg-white dark:text-black">
            <Bookmark size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Wishlist</h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Список желаемых товаров
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
            key={item.id}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <div>
                  <h2 className="line-clamp-1 text-lg font-semibold sm:text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2652 2.69516C10.6645 2.42465 10.1595 2.19721 9.73068 2.04459C9.28214 1.88493 8.8365 1.77616 8.35628 1.79762C7.62342 1.83038 6.91938 2.09259 6.34363 2.54719C5.96636 2.84508 5.70043 3.21886 5.4656 3.63303C5.24111 4.02895 5.00787 4.53135 4.73045 5.1289L4.27271 6.1148C4.03305 6.16272 3.82694 6.23064 3.63803 6.3269C3.07354 6.61452 2.6146 7.07346 2.32698 7.63795C2 8.27968 2 9.11976 2 10.7999V15.1999C2 16.8801 2 17.7202 2.32698 18.3619C2.6146 18.9264 3.07354 19.3853 3.63803 19.6729C4.27976 19.9999 5.11984 19.9999 6.8 19.9999H18.8C19.9201 19.9999 20.4802 19.9999 20.908 19.7819C21.2843 19.5902 21.5903 19.2842 21.782 18.9079C22 18.4801 22 17.92 22 16.7999V13.9999H17C16.4477 13.9999 16 13.5522 16 12.9999C16 12.4476 16.4477 11.9999 17 11.9999H22V9.19992C22 8.07982 22 7.51976 21.782 7.09194C21.5903 6.71562 21.2843 6.40965 20.908 6.21791C20.4802 5.99992 19.9201 5.99992 18.8 5.99992H18.6044L11.2652 2.69516ZM13.7333 5.99992L10.4804 4.53519C9.8338 4.24401 9.40304 4.05089 9.06001 3.92879C8.7281 3.81065 8.56039 3.79049 8.44559 3.79563C8.13151 3.80967 7.82977 3.92204 7.58302 4.11687C7.49284 4.18808 7.37916 4.31303 7.20539 4.6195C7.02648 4.93503 6.82783 5.36082 6.53107 5.99997C6.61826 5.99992 6.70787 5.99992 6.8 5.99992H13.7333Z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  <span className="text-2xl font-bold">{item.price}</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
{(() => {
  const reservation = getReservation(item.id);

  if (!reservation) {
    return (
      <button
        onClick={() => handleReserve(item.id)}
        className="
                      flex-1 rounded-2xl bg-zinc-900 px-4 py-3
                      text-sm font-medium text-white transition-all
                      hover:bg-zinc-800 active:scale-[0.98]
                      dark:bg-white dark:text-black dark:hover:bg-zinc-200
        "
      >
        Забронировать
      </button>
    );
  }

  if (reservation.reserved_by === id) {
    return (
      <button
        onClick={() =>
          handleCancelReservation(item.id)
        }
        className="
                      flex-1 rounded-2xl bg-zinc-900 px-4 py-3
                      text-sm font-medium text-white transition-all
                      hover:bg-zinc-800 active:scale-[0.98]
                      dark:bg-white dark:text-black dark:hover:bg-zinc-200
        "
      >
        Отменить бронь
      </button>
    );
  }

  return (
    <button
      disabled
      className="
                      flex-1 rounded-2xl bg-zinc-900 px-4 py-3
                      text-sm font-medium text-white transition-all
                      hover:bg-zinc-800 active:scale-[0.98]
                      dark:bg-white dark:text-black dark:hover:bg-zinc-200
        cursor-not-allowed
      "
    >
      Уже забронировано
    </button>
  );
})()}

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex items-center justify-center gap-2
                      rounded-2xl border border-zinc-300
                      px-4 py-3 text-sm font-medium transition-all
                      hover:bg-zinc-100 active:scale-[0.98]
                      dark:border-zinc-700 dark:hover:bg-zinc-800
                    "
                  >
                    Открыть
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Wishlist;
