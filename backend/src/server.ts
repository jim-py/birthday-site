import express from 'express';
import cors from 'cors';
import got from 'got';
import tracksRouter from "./routes/tracks.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/metadata', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('yandex.ru')) {
    return res.json({
      success: true,
      title: url.length > 70 ? url.substring(0, 67) + '...' : url,
      source: 'Yandex Music',
      url,
    });
  }

  try {
    const { body: html } = await got(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0 Safari/537.36',
      },
      timeout: { request: 5000 },
    });

    // Название трека
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
    let title = titleMatch ? titleMatch[1].trim() : 'Untitled Track';

    // Исполнитель
    const artistMatch = html.match(/<meta property="music:musician" content="([^"]+)"/i);
    const artist = artistMatch ? artistMatch[1].trim() : undefined;

    // Обложка
    const coverMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
    const cover = coverMatch ? coverMatch[1] : undefined;

    // Description
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
    const description = descMatch ? descMatch[1].trim() : undefined;

    // Чистим название от " — Artist" (Yandex часто так делает)
    if (title.includes(' — ')) {
      const [songTitle] = title.split(' — ');
      title = songTitle.trim();
    }

    res.json({
      success: true,
      title,
      artist,
      cover,
      description,
      source: 'Yandex Music',
      url,
    });
  } catch (error: any) {
    console.error('Metadata error:', error.message);
    res.json({
      success: false,
      title: url.length > 70 ? url.substring(0, 67) + '...' : url,
      source: 'Yandex Music',
      url,
    });
  }
});

app.use("/api/tracks", tracksRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server → http://localhost:${PORT}`);
});