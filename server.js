import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory Database
let movies = [
  {
    id: "modal1",
    title: "Mystery of Moksh Island",
    type: "movies",
    genre: "Adventure / Mystery",
    rating: 7.5,
    year: "2025",
    duration: "1h 45m",
    badge: "Trending",
    imgUrl: "https://s1.dmcdn.net/v/W__I-1cvAxfiU-GoE/x1080",
    description: "An animated adventure film that follows a young explorer's journey on a mysterious island filled with secrets, dynamic ruins, and strange creatures."
  },
  {
    id: "modal2",
    title: "Weak Hero Class 1",
    type: "movies",
    genre: "Action / Drama",
    rating: 8.5,
    year: "2024",
    duration: "8 Episodes",
    badge: "New",
    imgUrl: "https://m.media-amazon.com/images/S/pv-target-images/ccf551a52ab869acbe150c99e3aa5a84ce3803f75e54ade929941269aa8b6710.jpg",
    description: "A gripping, high-intensity school drama series about Yeon Shi-eun, a model student who uses his analytical skills, tools, and psychology to stand up against systemic bullying in his school."
  },
  {
    id: "modal3",
    title: "Solo Leveling: Reawaken",
    type: "movies",
    genre: "Fantasy / Action",
    rating: 8.9,
    year: "2025",
    duration: "1h 56m",
    badge: "Top 10",
    imgUrl: "https://m.media-amazon.com/images/I/71goH8p2ENL._AC_UF1000,1000_QL80_.jpg",
    description: "In a world where hunters must battle deadly monsters to protect mankind, Sung Jinwoo, the weakest hunter of all, finds himself in a struggle for survival inside a double dungeon. Re-awakened with a mysterious leveling system, his journey to become the strongest hunter begins."
  },
  {
    id: "modal4",
    title: "Dabba Cartel",
    type: "movies",
    genre: "Crime / Thriller",
    rating: 7.8,
    year: "2025",
    duration: "10 Episodes",
    badge: "",
    imgUrl: "https://images.indianexpress.com/2025/02/DABBA-CARTEL.jpg",
    description: "A high-stakes thriller about an unusual drug distribution syndicate run by home cooks. Secret transactions, unexpected cover-ups, and a cat-and-mouse chase with investigators unfold in a suspenseful plot."
  },
  {
    id: "modal-m5",
    title: "Demon Slayer: Infinity Castle",
    type: "movies",
    genre: "Anime / Action",
    rating: 9.1,
    year: "2025",
    duration: "2h 10m",
    badge: "Hot",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMzY5NTI0NzEtYjZhYy00MDA3LWI3ZDYtOTNmMjI5MDU2YjFkXkEyXkFqcGc@._V1_.jpg",
    description: "The final showdown between the demon slayers and Muzan Kibutsuji starts inside the dimensional Infinity Castle. Breath-taking battles, emotional sacrifices, and peak animation await the fans."
  },
  {
    id: "modal-m6",
    title: "Dune: Part Two",
    type: "movies",
    genre: "Sci-Fi / Adventure",
    rating: 8.8,
    year: "2024",
    duration: "2h 46m",
    badge: "Must Watch",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BODlhZDBjMDgtNDcxMC00MjU2LWEyYTAtODFiZDMyNDFlMDRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee."
  },
  {
    id: "modal-m7",
    title: "Spider-Man: Beyond Spider-Verse",
    type: "movies",
    genre: "Animation / Action",
    rating: 9.0,
    year: "2025",
    duration: "2h 15m",
    badge: "Top 10",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Z3mKq6-R9gUq0qUuT1L9FvK2oF7z2XwW0Q&s",
    description: "Miles Morales travels across dimensions once again to stop the Spot and save his father, teaming up with allies old and new in an epic multiversal race against time."
  },
  {
    id: "modal-m8",
    title: "Squid Game: Season 2",
    type: "movies",
    genre: "Thriller / Drama",
    rating: 8.2,
    year: "2024",
    duration: "6 Episodes",
    badge: "New",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BZWZlMzFhNmQtM2ZiMS00OTdkLThlOGUtYTc3NDYwYTdmOWJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "Gi-hun returns to the game with a new resolve, seeking revenge and attempting to shut down the deadly secret tournament once and for all, facing a brand-new set of mind-bending playground survival tests."
  }
];

let gaming = [
  {
    id: "modal5",
    title: "elrubiusOMG",
    type: "streamer",
    genre: "Minecraft / Variety",
    rating: "45K",
    badge: "LIVE",
    imgUrl: "https://marketing4ecommerce.net/en/wp-content/uploads/sites/8/2023/03/historia-elrubius.jpg",
    description: "Rubius is one of the biggest Spanish-speaking streamers, known for his hilarious Minecraft servers, reaction videos, and highly energetic gaming collaborations."
  },
  {
    id: "modal6",
    title: "Auronplay",
    type: "streamer",
    genre: "Just Chatting",
    rating: "Offline",
    badge: "OFFLINE",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68fLojqq7lJA5cPv33_5KygSLYx7_EZrNcg&sr",
    description: "Auronplay is a top content creator from Spain, celebrated for his humorous commentary, community interactions, and roleplay gaming series."
  },
  {
    id: "modal7",
    title: "Techno Gamerz",
    type: "streamer",
    genre: "GTA V / Mobile Games",
    rating: "120K",
    badge: "LIVE",
    imgUrl: "https://media.assettype.com/afkgaming%2F2023-05%2Fe28f3a24-6a43-4f0d-8294-1c68a6a186e5%2FCover_Image___Techno_Gamerz_Features_As_Playable_Game_Character_In_Battle_Stars.jpg?auto=format%2Ccompress&dpr=1.0&w=1200",
    description: "Techno Gamerz (Ujjwal Chaurasia) is a dominant force in Indian gaming, famous for his ongoing GTA V storytelling series, mobile battle-royale gameplay, and tutorials."
  },
  {
    id: "modal8",
    title: "Dynamo Gaming",
    type: "streamer",
    genre: "BGMI / Valorant",
    rating: "Offline",
    badge: "OFFLINE",
    imgUrl: "https://yt3.googleusercontent.com/ytc/AIdro_kCNu8QCIYlhtbGOmcJdRbEo4WZ9b7MrPly8mmZJdbBfP4=s900-c-k-c0x00ffffff-no-rj",
    description: "Aditya Sawant, aka Dynamo, is one of India's pioneering BGMI (Battlegrounds Mobile India) streamers, famous for his 'patt se headshot' sniper shots."
  },
  {
    id: "modal-g5",
    title: "Ninja",
    type: "streamer",
    genre: "Fortnite / Variety",
    rating: "15K",
    badge: "LIVE",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMGFmNzBiOTYtZGFmNi00YjVmLWJmOWUtOTNhY2YxMzhkOWYzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "Tyler Blevins, aka Ninja, is the world's most famous Fortnite streamer, known for his high-level gameplay, colorful hair, and streaming crossovers with global celebrities."
  },
  {
    id: "modal-g6",
    title: "Shroud",
    type: "streamer",
    genre: "FPS / Counter-Strike",
    rating: "28K",
    badge: "LIVE",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMjA3NTU2NTAtOGQ4Ni00NWI5LWI2YWItNzBiYWUzNjVkOGE2XkEyXkFqcGc@._V1_.jpg",
    description: "The 'Human Aim Aim-bot' Shroud is a former professional CS:GO player. He is known for his godly mechanical aim and calm demeanor in any tactical shooter."
  },
  {
    id: "modal-g7",
    title: "Pokimane",
    type: "streamer",
    genre: "Just Chatting / Valorant",
    rating: "Offline",
    badge: "OFFLINE",
    imgUrl: "https://images.livemint.com/img/2022/02/09/600x338/Pokimane_1644406180373_1644406187707.jpg",
    description: "Imane Anys, better known as Pokimane, is one of Twitch's most popular female streamers, specializing in community chat rooms and Valorant gameplay."
  },
  {
    id: "modal-g8",
    title: "Mortal",
    type: "streamer",
    genre: "BGMI / Variety",
    rating: "Offline",
    badge: "OFFLINE",
    imgUrl: "https://www.insidesport.in/wp-content/uploads/2021/07/mortal-pubg.jpg",
    description: "Naman Mathur, known as Mortal, is a revered Indian streamer and competitive BGMI player. He is widely praised for his tactical leadership and sportsmanship."
  }
];

let music = [
  {
    id: "music1",
    title: "Javed Ali Hits",
    type: "music",
    genre: "Sufi / Romance",
    rating: 8.4,
    artist: "Javed Ali",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dallQnxFXcS2l7ET2w95YZAEGf-yiPm7Ow&s",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "Enjoy a compilation of Javed Ali's soulful Sufi melodies, romantic hits, and soothing bollywood acoustic compositions."
  },
  {
    id: "music2",
    title: "Die With A Smile",
    type: "music",
    genre: "Bruno Mars & Lady Gaga",
    rating: 9.2,
    artist: "Bruno Mars & Lady Gaga",
    badge: "Top 10",
    imgUrl: "https://www.billboard.com/wp-content/uploads/2024/08/Lady-Gaga-Bruno-Mars-Die-With-A-Smile-screenshot-billboard-1548.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    description: "A chart-topping emotional ballad highlighting the stunning vocal harmonies of pop icons Bruno Mars and Lady Gaga."
  },
  {
    id: "music3",
    title: "Golden Sparrow",
    type: "music",
    genre: "Dhanush / GV Prakash",
    rating: 8.1,
    artist: "Dhanush & GV Prakash",
    badge: "New",
    imgUrl: "https://static.moviecrow.com/gallery/20240827/233438-Nilavuku%20En%20Mel%20Ennadi%20Kobam%20First%20Single%20Dhanush%20Priyanka%20Mohan%20Golden%20Sparrow%20GV%20Prakash%20%20.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description: "A fast-paced, catchy dance track featuring Priyanka Mohan and Dhanush, composed by the hitmaker GV Prakash."
  },
  {
    id: "music4",
    title: "Enna Solla",
    type: "music",
    genre: "Anirudh Ravichander",
    rating: 8.8,
    artist: "Anirudh Ravichander",
    imgUrl: "https://c.saavncdn.com/430/Thangamagan-Tamil-2015-500x500.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    description: "A beautiful, melodious acoustic track from Thangamagan, written and sung by the rockstar composer Anirudh Ravichander."
  },
  {
    id: "music5",
    title: "Blinding Lights",
    type: "music",
    genre: "Synthwave / Pop",
    rating: 9.0,
    artist: "The Weeknd",
    badge: "Hot",
    imgUrl: "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/mb2ssv5ixncrbngp57a3/the-weeknd-blinding-lights-cover",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    description: "An electrifying 80s-inspired synthwave pop hit that broke record charts worldwide by R&B singer The Weeknd."
  },
  {
    id: "music6",
    title: "Espresso",
    type: "music",
    genre: "Pop / Disco",
    rating: 8.5,
    artist: "Sabrina Carpenter",
    badge: "New",
    imgUrl: "https://media.pitchfork.com/photos/66184a29a008892f3922c070/master/pass/Sabrina-Carpenter-Espresso.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    description: "A sassy, summer-vibe pop track with retro disco beats, delivering Sabrina Carpenter's signature witty lyrics."
  },
  {
    id: "music7",
    title: "Birds of a Feather",
    type: "music",
    genre: "Alternative / Indie",
    rating: 8.9,
    artist: "Billie Eilish",
    badge: "Top 10",
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6s69L7Q60B3FwVw8L3T3Z6f3HhB2Y5Wqj2Q&s",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    description: "A dreamy alternative indie pop ballad about love and life, written by Billie Eilish and her brother Finneas."
  },
  {
    id: "music8",
    title: "Señorita",
    type: "music",
    genre: "Latin / Pop",
    rating: 8.3,
    artist: "Shawn Mendes & Camila Cabello",
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/e/e6/Shawn_Mendes_and_Camila_Cabello_-_Se%C3%B1orita.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    description: "An alluring, acoustic Latin pop collaboration that offers a sizzling chemistry and upbeat acoustic guitar rhythms."
  }
];

let sports = [
  {
    id: "modal13",
    title: "IPL 2025 Coverage",
    type: "sports",
    genre: "Cricket Leagues",
    rating: "Live",
    imgUrl: "https://img.jagranjosh.com/images/2025/February/1322025/IPL-2025-schedule.webp",
    description: "Witness the clash of giants in Indian Premier League 2025. Stay updated with real-time match analytics, fantasy leagues, and scoreboard tracking."
  },
  {
    id: "modal14",
    title: "Paris 2024 Highlights",
    type: "sports",
    genre: "Olympics Hub",
    rating: "9.0",
    imgUrl: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/1096F/production/_133115976_gettyimages-1334885488.jpg",
    description: "Relive the historic records, gold medal wins, and athletic achievements of the Paris 2024 Olympic Games."
  },
  {
    id: "modal15",
    title: "Spain Euro Campaign",
    type: "sports",
    genre: "UEFA Football",
    rating: "8.6",
    imgUrl: "https://imageio.forbes.com/specials-images/imageserve/666c0b3267235c4409185787/Spain-v-Northern-Ireland---International-Friendly/960x0.jpg?format=jpg&width=960",
    description: "Follow Spain's incredible journey to securing the European Championship, featuring stars like Lamine Yamal and Rodri."
  },
  {
    id: "modal16",
    title: "Equestrian Riding",
    type: "sports",
    genre: "Show Jumping / Derby",
    rating: "7.9",
    imgUrl: "https://www.paralympic.org/sites/default/files/2024-04/Philippa%20Johnson-Dwyer%2C%20South%20Africa%2C%20Equestrian.jpg",
    description: "Watch professional show jumping tournaments, derby championships, and freestyle dressage highlights from across the globe."
  },
  {
    id: "modal-s5",
    title: "Formula 1 Monaco GP",
    type: "sports",
    genre: "Motorsports",
    rating: "8.8",
    imgUrl: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2024/05/27170020/f1-monaco-grand-prix-2024-charles-leclerc.jpg",
    description: "Experience the ultimate street race around the tight corners of Monaco. Speed, glamor, and tactical pitstop dramas."
  },
  {
    id: "modal-s6",
    title: "NBA Finals 2025",
    type: "sports",
    genre: "Basketball",
    rating: "9.1",
    imgUrl: "https://sportshub.cbsistatic.com/i/r/2024/06/17/2c3a502c-4976-4d05-ac1c-8e3152ea8df4/thumbnail/1200x675/9518db9d18e87850a49800742f1f0a20/celtics-trophy.jpg",
    description: "Get updates on the Eastern and Western Conference Champions as they battle for the Larry O'Brien Championship Trophy."
  },
  {
    id: "modal-s7",
    title: "Wimbledon 2025",
    type: "sports",
    genre: "Tennis Grand Slam",
    rating: "Upcoming",
    imgUrl: "https://cdn.britannica.com/46/151646-050-B77FEA69/Wimbledon-Championships-All-England-Lawn-Tennis-club-July-2011.jpg",
    description: "Follow the world's most prestigious grass-court tennis tournament at the All England Club in London."
  },
  {
    id: "modal-s8",
    title: "UEFA Champions League Final",
    type: "sports",
    genre: "European Football",
    rating: "Live",
    imgUrl: "https://www.uefa.com/multimediafiles/photo/uefachampionsleague/about/02/91/66/12/2916612_big-landscape.jpg",
    description: "The ultimate clash of club football. Real Madrid vs Manchester City live matches, matchday coverage, and tactics."
  }
];

let news = [
  {
    id: "news1",
    category: "Music",
    title: "Shreya's Stellar IPL Performance",
    imgUrl: "https://pbs.twimg.com/media/GmpU7aEa0AAiEw6.jpg:large",
    description: "Shreya delivered a breathtaking 15-minute vocal performance at the IPL opening ceremony, leaving stadium crowds and online fans awestruck by her melody."
  },
  {
    id: "news2",
    category: "Movies",
    title: "Minecraft Movie Coming Soon",
    imgUrl: "https://i.redd.it/a4pu8ndutofe1.jpeg",
    description: "Four misfits land in the Overworld—a cubic wonderland—and must team up with Steve, an unlikely crafting expert, to solve puzzles and return home safely."
  },
  {
    id: "news3",
    category: "Sports",
    title: "IPL 2025 Season Preview",
    imgUrl: "https://english.cdn.zeenews.com/sites/default/files/2025/02/11/1664221-ipl-2025-retention-rules.jpg",
    description: "The new cricket retention regulations are out, preparing the ground for an explosive auction pool as teams restructure their foundational rosters."
  },
  {
    id: "news4",
    category: "Gaming",
    title: "Fortnite Latest Season Drops",
    imgUrl: "https://m.media-amazon.com/images/M/MV5BMTZlMmIxM2EtN2Y4Zi00M2ZhLTk3NzgtNjJmZTU0MTQ3YjcwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    description: "Epic Games reveals its newest season roadmap featuring crossover universes, custom weapon benches, and major modifications to the battle royale map."
  },
  {
    id: "news5",
    category: "Music",
    title: "Linkin Park World Tour 2025",
    imgUrl: "https://variety.com/wp-content/uploads/2024/09/Linkin-Park-Emily-Armstrong.jpg?w=1000",
    description: "Following the release of their new album 'From Zero', Linkin Park has officially announced their 40-city global arena tour starting this autumn."
  },
  {
    id: "news6",
    category: "Gaming",
    title: "GTA 6 Second Trailer Scheduled",
    imgUrl: "https://m.media-amazon.com/images/I/71wLpWf2YQL._AC_UF1000,1000_QL80_.jpg",
    description: "Rockstar Games surprises fans by adding an announcement regarding their next GTA VI gameplay trailer, teasing next-gen physics and online features."
  },
  {
    id: "news7",
    category: "Movies",
    title: "Oscar Nominations 2025",
    imgUrl: "https://variety.com/wp-content/uploads/2024/02/Oscars-96th-Awards-Show-A.jpg?w=1000",
    description: "The Academy of Motion Picture Arts and Sciences reveals their nominations list. Dune Part 2 and independent biopics dominate the awards categories."
  },
  {
    id: "news8",
    category: "Sports",
    title: "FIFA Club World Cup Expansion",
    imgUrl: "https://editorial.uefa.com/resources/0288-199f1faecb9c-ca14dfca4251-1000/the_fifa_club_world_cup_trophy.jpeg",
    description: "FIFA completes its plans to run the newly structured 32-team Club World Cup next summer, creating intense controversies among league calendars."
  }
];

let polls = [
  {
    id: "poll1",
    question: "Who is your favorite character in Solo Leveling?",
    category: "Movies",
    totalVotes: 1450,
    options: [
      { key: "A", label: "Sung Jinwoo (The Shadow Monarch)", votes: 850 },
      { key: "B", label: "Cha Hae-In (S-Rank Hunter)", votes: 320 },
      { key: "C", label: "Go Gunhee (Association Chairman)", votes: 150 },
      { key: "D", label: "Thomas Andre (Goliath)", votes: 130 }
    ]
  },
  {
    id: "poll2",
    question: "Which track is dominating your playlist right now?",
    category: "Music",
    totalVotes: 980,
    options: [
      { key: "A", label: "Die With A Smile", votes: 480 },
      { key: "B", label: "Golden Sparrow", votes: 200 },
      { key: "C", label: "Javed Ali Hits", votes: 180 },
      { key: "D", label: "Enna Solla", votes: 120 }
    ]
  },
  {
    id: "poll3",
    question: "Who will win the IPL 2025 trophy?",
    category: "Sports",
    totalVotes: 2300,
    options: [
      { key: "A", label: "Mumbai Indians", votes: 750 },
      { key: "B", label: "Chennai Super Kings", votes: 800 },
      { key: "C", label: "Royal Challengers Bengaluru", votes: 450 },
      { key: "D", label: "Kolkata Knight Riders", votes: 300 }
    ]
  },
  {
    id: "poll4",
    question: "What is your main game of 2025?",
    category: "Gaming",
    totalVotes: 1100,
    options: [
      { key: "A", label: "GTA V / GTA 6", votes: 550 },
      { key: "B", label: "Valorant", votes: 250 },
      { key: "C", label: "Minecraft", votes: 180 },
      { key: "D", label: "BGMI", votes: 120 }
    ]
  }
];

let events = [
  { id: 1, name: "IPL 2025 Opener: CSK vs RCB", date: "2025-03-22" },
  { id: 2, name: "Solo Leveling Season 2 Global Release", date: "2025-04-05" },
  { id: 3, name: "Linkin Park Live Concert - Tokyo", date: "2025-05-15" }
];

// Unified autocomplete database
const getSearchLibrary = () => {
  let list = [];
  movies.forEach(m => list.push({ name: m.title, type: "Movie", triggerId: m.id, page: "/movies", img: m.imgUrl }));
  gaming.forEach(g => list.push({ name: g.title, type: "Streamer", triggerId: g.id, page: "/gaming", img: g.imgUrl }));
  music.forEach((m, idx) => list.push({ name: m.title, type: "Music Track", playerTrack: idx, page: "/music", img: m.imgUrl }));
  sports.forEach(s => list.push({ name: s.title, type: "Sports Highlights", triggerId: s.id, page: "/sports", img: s.imgUrl }));
  return list;
};

// API Endpoints
app.get('/api/movies', (req, res) => res.json(movies));
app.get('/api/gaming', (req, res) => res.json(gaming));
app.get('/api/music', (req, res) => res.json(music));
app.get('/api/sports', (req, res) => res.json(sports));
app.get('/api/news', (req, res) => res.json(news));
app.get('/api/polls', (req, res) => res.json(polls));

app.post('/api/polls/:id/vote', (req, res) => {
  const { id } = req.params;
  const { optionKey } = req.body;
  const poll = polls.find(p => p.id === id);
  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }
  const option = poll.options.find(o => o.key === optionKey);
  if (!option) {
    return res.status(400).json({ error: "Invalid option selected" });
  }
  option.votes += 1;
  poll.totalVotes += 1;
  res.json(poll);
});

app.get('/api/events', (req, res) => res.json(events));
app.post('/api/events', (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: "Name and date are required" });
  }
  const newEvent = {
    id: events.length + 1,
    name,
    date
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) return res.json([]);
  const library = getSearchLibrary();
  const results = library.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.type.toLowerCase().includes(query)
  );
  res.json(results);
});

// Serve frontend React application built assets in production
const frontendBuildPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

export default app;
