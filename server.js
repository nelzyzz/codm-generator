const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 10000;
const DATA_FILE = path.join(__dirname, 'accounts_data.json');
const USERS_FILE = path.join(__dirname, 'users.json');
const ANNOUNCE_FILE = path.join(__dirname, 'announcement.json');

app.use(express.json({ limit: '10mb' }));

function readJSON(f) { try { return JSON.parse(fs.readFileSync(f, 'utf-8')); } catch(e) { return null; } }
function writeJSON(f, d) { fs.writeFileSync(f, JSON.stringify(d, null, 2), 'utf-8'); }
function hashPassword(pw) { return crypto.createHash('sha256').update(pw + 'sunnelxy_salt_2026').digest('hex'); }

const defaultAccounts = [
    { account: "CleverDoggy : Lolklark", uid: "394422932", username: "CleverDoggy", garenaShell: "0", email: "ken****@gmail.com (Verified)", mobile: "+63 ****5005", country: "PH", nickname: "ajax", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=925612667865241", fbStatus: "FB UNBIND or FB DELETED", level: "295", server: "🇵🇭 Philippines (PH)", ign: "FUDOOOO", lastLogin: "July 21, 2026 | 02:08 AM", loginFrom: "Garena Account Center", loginIP: "95.211.174.135", loginCountry: "NL", status: "Not Clean" },
    { account: "Legobryanq@gmail.com : 190309bq", uid: "536606249", username: "shadowsninjas", garenaShell: "0", email: "leg****@gmail.com (Not Verified)", mobile: "+65 ****0878", country: "SG", nickname: "", fbUsername: "N/A", fbLink: "N/A", fbStatus: "NOT CONNECTED", level: "294", server: "🇸🇬 Singapore (SG)", ign: "ZH SEÕN", lastLogin: "July 20, 2026 | 07:55 PM", loginFrom: "Mobile - Ga", loginIP: "143.44.193.172", loginCountry: "PH", status: "Not Clean" },
    { account: "eravanx : asdas312", uid: "163387727", username: "eravanx", garenaShell: "0", email: "Era****@yahoo.com (Not Verified)", mobile: "+63 ****6220", country: "PH", nickname: "ngūyén", fbUsername: "N/A", fbLink: "N/A", fbStatus: "NOT CONNECTED", level: "294", server: "🇵🇭 Philippines (PH)", ign: "Hokai.262", lastLogin: "July 21, 2026 | 12:15 AM", loginFrom: "Garena Account Center", loginIP: "111.254.79.52", loginCountry: "TW", status: "Not Clean" },
    { account: "Pingko10k : Brianitachi123@*", uid: "600628786", username: "Pingko10k", garenaShell: "0", email: "pin****@gmail.com (Verified)", mobile: "N/A", country: "PH", nickname: "Then we'll see who's begging fo", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=113523335133204", fbStatus: "FB UNBIND or FB DELETED", level: "292", server: "🇵🇭 Philippines (PH)", ign: "PukeM0P1nk", lastLogin: "July 21, 2026 | 03:04 AM", loginFrom: "Garena Account Center", loginIP: "43.245.224.68", loginCountry: "NL", status: "Not Clean" },
    { account: "cplayacc : alexia0310", uid: "530626912", username: "Cplayacc", garenaShell: "0", email: "cpl****@gmail.com (Verified)", mobile: "+63 ****0299", country: "PH", nickname: "", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=3131298280490392", fbStatus: "FB UNBIND or FB DELETED", level: "291", server: "🇵🇭 Philippines (PH)", ign: "[54mH3POoCGz", lastLogin: "July 21, 2026 | 12:57 AM", loginFrom: "Garena Account Center", loginIP: "177.93.46.122", loginCountry: "CO", status: "Not Clean" },
    { account: "lascuna16 : 096719741250qwe", uid: "188251911", username: "lascuna16", garenaShell: "0", email: "joh****@yahoo.com (Verified)", mobile: "+63 ****9445", country: "PH", nickname: "raixnxn", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=1031380270274396", fbStatus: "FB UNBIND or FB DELETED", level: "288", server: "🇵🇭 Philippines (PH)", ign: "[8kpj76SfIrP", lastLogin: "July 21, 2026 | 03:11 AM", loginFrom: "Garena Account Center", loginIP: "208.82.61.64", loginCountry: "US", status: "Not Clean" },
    { account: "xGHxJHURENZ : jhurenzarapoc11", uid: "510505081", username: "xGHxJHURENZ", garenaShell: "0", email: "jhu****@depedparanaquecity.com (Verified)", mobile: "+63 ****8082", country: "PH", nickname: "HAHAHA BATA", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=827597317981965", fbStatus: "FB UNBIND or FB DELETED", level: "281", server: "🇵🇭 Philippines (PH)", ign: "FootBootRush", lastLogin: "July 21, 2026 | 01:33 AM", loginFrom: "Garena Account Center", loginIP: "177.93.49.202", loginCountry: "CO", status: "Not Clean" },
    { account: "zhianne24 : jadegwapo123321", uid: "89342058", username: "zhianne24", garenaShell: "0", email: "car****@yahoo.com (Not Verified)", mobile: "+63 ****4270", country: "PH", nickname: "", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=203256340153302", fbStatus: "FB UNBIND or FB DELETED", level: "281", server: "🇵🇭 Philippines (PH)", ign: "[3UZ3z57UQ2e", lastLogin: "July 20, 2026 | 06:42 PM", loginFrom: "Garena Mobile", loginIP: "42.114.56.136", loginCountry: "VN", status: "Not Clean" },
    { account: "ricamarquez09 : asdfg123", uid: "538284930", username: "ricamarquez09", garenaShell: "0", email: "N/A", mobile: "+63 ****7192", country: "PH", nickname: "Life is life don't be sad", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=542616356652001", fbStatus: "FB UNBIND or FB DELETED", level: "278", server: "🇵🇭 Philippines (PH)", ign: "[9ppvju5cZLt", lastLogin: "July 21, 2026 | 12:19 AM", loginFrom: "Garena Account Center", loginIP: "181.118.147.28", loginCountry: "CO", status: "Not Clean" },
    { account: "yahoo2111 : kevinwagayan31", uid: "153108271", username: "yahoo2111", garenaShell: "0", email: "adr****@yahoo.com (Not Verified)", mobile: "+63 ****0731", country: "PH", nickname: "", fbUsername: "N/A", fbLink: "N/A", fbStatus: "NOT CONNECTED", level: "202", server: "🇵🇭 Philippines (PH)", ign: "nebyyy", lastLogin: "July 30, 2026 | 10:45 PM", loginFrom: "Garena Account Center", loginIP: "104.239.41.20", loginCountry: "CA", status: "Not Clean" },
    { account: "TimothyJhames15 : Motmot123@", uid: "566114828", username: "TimothyJhames15", garenaShell: "0", email: "lec****@gmail.com (Verified)", mobile: "+63 ****6721", country: "PH", nickname: "Yanna", fbUsername: "Laira Celeste Gonzales", fbLink: "https://www.facebook.com/profile.php?id=353342410515999", fbStatus: "CONNECTED", level: "400", server: "🇵🇭 Philippines (PH)", ign: "TIMOTIIII", lastLogin: "July 30, 2026 | 09:50 PM", loginFrom: "Garena Account Center", loginIP: "172.102.218.64", loginCountry: "AU", status: "Not Clean" },
    { account: "bambul_bul : .bambul_bul.", uid: "556851918", username: "bambul_bul", garenaShell: "0", email: "joh****@gmail.com (Not Verified)", mobile: "+63 ****3427", country: "PH", nickname: "", fbUsername: "N/A", fbLink: "N/A", fbStatus: "NOT CONNECTED", level: "353", server: "🇵🇭 Philippines (PH)", ign: "RanverWTF", lastLogin: "July 30, 2026 | 09:53 PM", loginFrom: "Garena Account Center", loginIP: "168.138.12.74", loginCountry: "AU", status: "Not Clean" },
    { account: "sandmaster1697 : ronald1697<3", uid: "77255512", username: "sandmaster1697", garenaShell: "0", email: "yma****@yahoo.com (Verified)", mobile: "+63 ****8391", country: "PH", nickname: "Ronald Panaligan", fbUsername: "Ronald Joshua", fbLink: "https://www.facebook.com/profile.php?id=100000510932805", fbStatus: "CONNECTED", level: "196", server: "🇵🇭 Philippines (PH)", ign: "4thDerivative", lastLogin: "August 01, 2026 | 12:29 AM", loginFrom: "Garena Account Center", loginIP: "102.208.20.50", loginCountry: "GH", status: "Not Clean" },
    { account: "khanoksak-r28 : nok0615917721", uid: "368356010", username: "khanoksak-r28", garenaShell: "0", email: "kha****@gmail.com (Verified)", mobile: "+66 ****7721", country: "TH", nickname: "WANNABE", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=2343538142594924", fbStatus: "FB UNBIND or FB DELETED", level: "191", server: "🇹🇭 Thailand (TH)", ign: "BUKITÍ", lastLogin: "August 01, 2026 | 12:32 AM", loginFrom: "Garena Account Center", loginIP: "69.181.52.45", loginCountry: "US", status: "Not Clean" },
    { account: "hfhdjsksjssjsj : @June192008", uid: "546004507", username: "hfhdjsksjssjsj", garenaShell: "0", email: "mhi****@gmail.com (Not Verified)", mobile: "+63 ****9978", country: "PH", nickname: "", fbUsername: "", fbLink: "https://www.facebook.com/profile.php?id=669162831176677", fbStatus: "FB UNBIND or FB DELETED", level: "179", server: "🇵🇭 Philippines (PH)", ign: "ZYSS_۶ৎ", lastLogin: "August 01, 2026 | 12:25 AM", loginFrom: "Garena Account Center", loginIP: "102.208.20.50", loginCountry: "GH", status: "Not Clean" }
];

if (!readJSON(DATA_FILE)) writeJSON(DATA_FILE, defaultAccounts);
if (!readJSON(ANNOUNCE_FILE)) writeJSON(ANNOUNCE_FILE, { title: 'WELCOME', text: 'Welcome! 15 high-level CODM accounts. Login to generate!', visible: true, custom: true, autoText: '' });

if (!readJSON(USERS_FILE)) {
    const token = crypto.randomBytes(32).toString('hex');
    writeJSON(USERS_FILE, {
        "sunnel": {
            password: hashPassword("sunnel123"),
            token: token,
            savedAccounts: [
                { account: "juniorza161 : ILPJunior161", username: "Juniorza161", uid: "520766970", level: "56", ign: "Nieces.", savedAt: new Date().toISOString() },
                { account: "AkiH1r09 : 10092022_Aki", username: "AkiH1r09", uid: "597099111", level: "282", ign: "ɅSC James CB", savedAt: new Date().toISOString() }
            ],
            createdAt: new Date().toISOString()
        }
    });
}

function authMiddleware(req, res, next) {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ error: 'Login required' });
    const users = readJSON(USERS_FILE) || {};
    const found = Object.entries(users).find(([u, d]) => d.token === token);
    if (!found) return res.status(401).json({ error: 'Invalid session' });
    req.user = { username: found[0], ...found[1] };
    next();
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Required' });
    if (username.length < 3 || password.length < 4) return res.status(400).json({ error: 'Min 3/4 chars' });
    const users = readJSON(USERS_FILE) || {};
    if (users[username]) return res.status(409).json({ error: 'Taken' });
    const token = crypto.randomBytes(32).toString('hex');
    users[username] = { password: hashPassword(password), token, savedAccounts: [], createdAt: new Date().toISOString() };
    writeJSON(USERS_FILE, users);
    res.json({ success: true, token, username, isNew: true });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readJSON(USERS_FILE) || {}, user = users[username];
    if (!user || user.password !== hashPassword(password)) return res.status(401).json({ error: 'Invalid' });
    const token = crypto.randomBytes(32).toString('hex');
    user.token = token; writeJSON(USERS_FILE, users);
    res.json({ success: true, token, username, isNew: false });
});

app.post('/api/logout', authMiddleware, (req, res) => {
    const users = readJSON(USERS_FILE) || {};
    if (users[req.user.username]) { users[req.user.username].token = null; writeJSON(USERS_FILE, users); }
    res.json({ success: true });
});

app.get('/api/accounts', (req, res) => res.json(readJSON(DATA_FILE) || []));
app.get('/api/announcement', (req, res) => res.json(readJSON(ANNOUNCE_FILE) || {}));

app.get('/api/admin/users', (req, res) => {
    if (req.query.password !== 'sunneladmin2026') return res.status(403).json({ error: 'Unauthorized' });
    const users = readJSON(USERS_FILE) || {};
    res.json(Object.entries(users).map(([u, d]) => ({ username: u, activated: d.activated, savedCount: (d.savedAccounts||[]).length, createdAt: d.createdAt })));
});

app.get('/api/user/saved', authMiddleware, (req, res) => res.json((readJSON(USERS_FILE)||{})[req.user.username]?.savedAccounts || []));
app.post('/api/user/saved', authMiddleware, (req, res) => {
    const users = readJSON(USERS_FILE) || {}, user = users[req.user.username];
    if (!user) return res.status(404).json({ error: 'Not found' });
    if (user.savedAccounts.find(s => s.account === req.body.account)) return res.json({ success: true });
    user.savedAccounts.unshift({ ...req.body, savedAt: new Date().toISOString() });
    writeJSON(USERS_FILE, users);
    res.json({ success: true, total: user.savedAccounts.length });
});
app.delete('/api/user/saved/:index', authMiddleware, (req, res) => {
    const users = readJSON(USERS_FILE) || {}, user = users[req.user.username];
    if (!user) return res.status(404).json({ error: 'Not found' });
    user.savedAccounts.splice(parseInt(req.params.index), 1);
    writeJSON(USERS_FILE, users);
    res.json({ success: true });
});
app.post('/api/admin/accounts', (req, res) => {
    if (req.body.password !== 'sunneladmin2026') return res.status(403).json({ error: 'Unauthorized' });
    writeJSON(DATA_FILE, req.body.accounts);
    res.json({ success: true, count: req.body.accounts.length });
});
app.post('/api/admin/announcement', (req, res) => {
    if (req.body.password !== 'sunneladmin2026') return res.status(403).json({ error: 'Unauthorized' });
    writeJSON(ANNOUNCE_FILE, req.body.announcement);
    res.json({ success: true });
});
app.use((req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(PORT, () => console.log('🚀 sunnelxy Website on port ' + PORT));
