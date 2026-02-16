<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SmartTaxi - README</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;line-height:1.6;margin:0;background:#0b1220;color:#e8eefc}
    .wrap{max-width:980px;margin:0 auto;padding:28px}
    .card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
    h1,h2,h3{margin:0 0 10px}
    h1{font-size:34px}
    h2{font-size:22px;margin-top:22px}
    h3{font-size:18px;margin-top:16px}
    p{margin:10px 0}
    ul{margin:8px 0 8px 18px}
    code, pre{background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);border-radius:10px}
    code{padding:2px 6px}
    pre{padding:14px;overflow:auto}
    .tag{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(99,102,241,.18);border:1px solid rgba(99,102,241,.35);margin:4px 6px 0 0}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px}
    .mini{padding:14px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.10)}
    a{color:#93c5fd;text-decoration:none}
    a:hover{text-decoration:underline}
    hr{border:none;border-top:1px solid rgba(255,255,255,.12);margin:18px 0}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>🚕 SmartTaxi – AI Smart Traffic & Taxi Optimization Platform</h1>
      <p>
        <strong>SmartTaxi</strong> est une plateforme intelligente de gestion et d’optimisation des taxis utilisant l’IA pour :
        réduire le temps d’attente, minimiser les trajets à vide, optimiser le trafic urbain et diminuer les émissions de CO₂.
      </p>

      <div>
        <span class="tag">React + Vite</span>
        <span class="tag">Node.js + TypeScript</span>
        <span class="tag">Prisma</span>
        <span class="tag">Heatmap</span>
        <span class="tag">Chatbot IA</span>
        <span class="tag">Map (Leaflet/Mapbox)</span>
      </div>

      <hr/>

      <h2>📌 Problème</h2>
      <ul>
        <li>Les passagers attendent longtemps.</li>
        <li>Des taxis roulent à vide ailleurs.</li>
        <li>Carburant gaspillé + trafic mal optimisé.</li>
        <li>Données urbaines peu exploitées intelligemment.</li>
      </ul>

      <h2>💡 Solution</h2>
      <ul>
        <li>📊 Heatmap intelligente du trafic</li>
        <li>🧠 Analyse / prédiction des zones à forte demande</li>
        <li>🤖 Chatbot IA d’assistance</li>
        <li>📍 Carte interactive en temps réel</li>
        <li>📈 Statistiques dynamiques</li>
      </ul>

      <h2>🏗 Architecture Technique</h2>
      <div class="grid">
        <div class="mini">
          <h3>Frontend</h3>
          <ul>
            <li>React.js</li>
            <li>Vite</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
            <li>Lucide Icons</li>
            <li>Carte (Leaflet / Mapbox)</li>
          </ul>
        </div>
        <div class="mini">
          <h3>Backend</h3>
          <ul>
            <li>Node.js</li>
            <li>TypeScript</li>
            <li>Prisma ORM</li>
            <li>PostgreSQL / MySQL</li>
            <li>API REST</li>
          </ul>
        </div>
        <div class="mini">
          <h3>IA & Data</h3>
          <ul>
            <li>Calcul Heatmap dynamique</li>
            <li>Prédiction trafic / demande</li>
            <li>Optimisation simple d’affectation</li>
            <li>Intégration API IA (OpenAI ou modèle local)</li>
          </ul>
        </div>
      </div>

      <h2>📂 Structure du Projet</h2>
      <pre><code>SmartTaxi/
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── heatmap/
│   └── chatbot/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── prisma/
│   ├── routes/
│   └── api/
└── README.html</code></pre>

      <h2>🚀 Fonctionnalités</h2>
      <ul>
        <li>✔ Visualisation Heatmap du trafic</li>
        <li>✔ Endpoint API <code>/api/ai/heatmap</code></li>
        <li>✔ Chatbot intelligent intégré</li>
        <li>✔ Statistiques temps réel</li>
        <li>✔ UI moderne (glassmorphism)</li>
        <li>✔ Responsive</li>
      </ul>

      <h2>🔌 API Exemple</h2>
      <h3>GET Heatmap Data</h3>
      <pre><code>GET /api/ai/heatmap</code></pre>

      <h3>Response Example</h3>
      <pre><code>[
  { "lat": 33.5731, "lng": -7.5898, "intensity": 0.87 }
]</code></pre>

      <h2>🛠 Installation</h2>
      <h3>1) Cloner le projet</h3>
      <pre><code>git clone https://github.com/username/smarttaxi.git
cd smarttaxi</code></pre>

      <h3>2) Backend</h3>
      <pre><code>cd backend
npm install
npx prisma generate
npm run dev</code></pre>

      <h3>3) Frontend</h3>
      <pre><code>cd frontend
npm install
npm run dev</code></pre>

      <h2>🧠 Vision Future</h2>
      <ul>
        <li>🔮 Modèles ML plus avancés</li>
        <li>📱 Application mobile</li>
        <li>🏙 Intégration Smart City</li>
        <li>📡 Données trafic réelles (capteurs / APIs publiques)</li>
        <li>🤝 Partenariats municipaux</li>
      </ul>

      <h2>🌍 Impact</h2>
      <ul>
        <li>Réduction des trajets à vide</li>
        <li>Diminution du temps d’attente</li>
        <li>Optimisation de la circulation</li>
        <li>Réduction de l’empreinte carbone</li>
      </ul>

      <h2>👨‍💻 Auteur</h2>
      <p>
        Projet développé par un étudiant ingénieur passionné par le développement logiciel, l’IA,
        l’optimisation algorithmique et la smart mobility.
      </p>

      <h2>📄 Licence</h2>
      <p>Projet académique / Hackathon.</p>

      <hr/>
      <p style="opacity:.85">
        Besoin d’une version <strong>ultra hackathon</strong> (pitch + screenshots + badges) ? Dis-moi et je te la génère.
      </p>
    </div>
  </div>
</body>
</html>
