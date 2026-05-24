"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./NavBar"
import {
  Plus,
  Trash2,
  Copy,
  Music,
  Loader,
  Grid,
  List,
  ExternalLink,
} from "react-feather";

interface Track {
  id: string;
  title: string;
  artist?: string;
  cover?: string;
  description?: string;
  url: string;
  source?: string;
}

type ViewMode = "list" | "grid";

const MusicPlaylistBlock: React.FC = () => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [newLink, setNewLink] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // ===== LOAD TRACKS FROM DB =====
  useEffect(() => {
    const loadTracks = async () => {
      try {
        const res = await fetch(`/api/tracks`);
        const data = await res.json();
        setPlaylist(data || []);
      } catch (e) {
        console.error("Failed to load tracks", e);
      }
    };

    loadTracks();
  }, []);

  // Автоопределение темы
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      //setIsDark(media.matches);
      if (media.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    updateTheme();
    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, []);

  const fetchMetadata = async (url: string): Promise<Partial<Track>> => {
    setIsAdding(true);
    setErrorMessage("");

    if (!url.toLowerCase().includes("yandex")) {
      setIsAdding(false);
      return {
        title: url.length > 70 ? `${url.substring(0, 67)}...` : url,
        source: "Внешний источник",
      };
    }

    try {
      const response = await fetch(`/api/metadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Server error");
      return await response.json();
    } catch (error) {
      console.error(error);
      setErrorMessage("Не удалось получить данные с сервера");
      return {
        title: url.length > 70 ? `${url.substring(0, 67)}...` : url,
        source: "Yandex Music",
      };
    } finally {
      setIsAdding(false);
    }
  };

  // ===== ADD TRACK (NOW SAVES TO BACKEND) =====
  const addToPlaylist = async () => {
    if (!newLink.trim()) return;

    const metadata = await fetchMetadata(newLink.trim());

    const id =
      Date.now().toString(36) + Math.random().toString(36).substr(2);

    const newTrack: Track = {
      id,
      title: metadata.title || "Untitled Track",
      artist: metadata.artist,
      cover: metadata.cover,
      description: metadata.description,
      url: newLink.trim(),
      source: metadata.source,
    };

    try {
      await fetch(`/api/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newTrack.id,
          url: newTrack.url,
          title: newTrack.title,
          description: newTrack.description,
          cover: newTrack.cover,
          source: newTrack.source,
        }),
      });

      setPlaylist((prev) => [newTrack, ...prev]);
      setNewLink("");
    } catch (e) {
      console.error("Failed to save track", e);
      setErrorMessage("Ошибка сохранения трека");
    }
  };

  // ===== DELETE TRACK (BACKEND SYNCED) =====
  const removeFromPlaylist = async (id: string) => {
    try {
      await fetch(`/api/tracks/${id}`, {
        method: "DELETE",
      });

      setPlaylist((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error("Failed to delete track", e);
    }
  };

  const copyTrackTitle = (title: string) => {
    navigator.clipboard.writeText(title);
  };

  const filteredPlaylist = playlist.filter((track) => {
    const title = track?.title ?? "";
    const artist = track?.artist ?? "";

    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* ADD */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-8 mb-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addToPlaylist()}
              placeholder="Вставь ссылку или напиши название..."
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-violet-500 rounded-2xl px-5 py-4 text-base sm:text-lg outline-none transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={addToPlaylist}
              disabled={isAdding || !newLink.trim()}
              className="px-6 sm:px-8 py-4 bg-violet-600 hover:bg-violet-700 disabled:bg-zinc-400 text-white rounded-2xl font-medium flex items-center gap-3 justify-center transition-colors min-h-[56px]"
            >
              {isAdding ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isAdding ? "Парсинг..." : "Добавить"}
            </motion.button>
          </div>
          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        {/* Переключение вида */}
        <div className="flex items-center gap-2 mb-6">
          <button
            title="Список"
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-2xl border transition-all ${
              viewMode === "list"
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            title="Сетка"
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-2xl border transition-all ${
              viewMode === "grid"
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>

        {/* Поиск */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск в плейлисте..."
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 pl-12 outline-none focus:border-violet-500 transition-all"
          />
          <Music className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
        </div>

        {/* Плейлист */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              : "space-y-3"
          }
        >
          <AnimatePresence>
            {filteredPlaylist.length > 0 ? (
              filteredPlaylist.map((track, idx) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                    delay: viewMode === "list" ? idx * 0.02 : 0,
                  }}
                  className={`group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-violet-500/40 transition-all overflow-hidden ${
                    viewMode === "grid"
                      ? "p-5 flex flex-col"
                      : "p-4 flex flex-col sm:flex-row gap-4 sm:items-center"
                  }`}
                >
                  {/* Cover */}
                  <div
                    className={`rounded-2xl overflow-hidden shadow-md flex-shrink-0 ${
                      viewMode === "grid"
                        ? "w-full aspect-square mb-4"
                        : "w-full sm:w-24 h-44 sm:h-24"
                    }`}
                  >
                    {track.cover ? (
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                        <Music className="w-8 h-8 text-zinc-500" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    {viewMode === "grid" ? (
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-semibold leading-tight break-words min-w-0">
                            {track.title}
                          </h3>

                          {track.source && (
                            <span className="shrink-0 text-xs px-3 py-1 bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 rounded-full whitespace-nowrap">
                              {track.source}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-base sm:text-lg font-semibold leading-tight break-words">
                          {track.title}
                        </h3>

                        {track.source && (
                          <span className="inline-block mt-2 text-xs px-3 py-1 bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 rounded-full">
                            {track.source}
                          </span>
                        )}
                      </>
                    )}

                    {track.artist && (
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        {track.artist}
                      </p>
                    )}

                    {track.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2">
                        {track.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div
                    className={`flex gap-2 ${
                      viewMode === "list"
                        ? "w-full sm:w-auto sm:ml-auto justify-start sm:justify-end flex-wrap sm:flex-nowrap"
                        : "justify-start"
                    }`}
                  >
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Открыть"
                      aria-label="Открыть"
                      className="p-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors inline-flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>

                    <button
                      onClick={() => copyTrackTitle(track.title)}
                      title="Копировать название"
                      aria-label="Копировать название"
                      className="p-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => removeFromPlaylist(track.id)}
                      title="Удалить"
                      aria-label="Удалить"
                      className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-2xl transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-zinc-500 dark:text-zinc-400">
                Плейлист пока пуст. Добавьте первый трек!
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MusicPlaylistBlock;