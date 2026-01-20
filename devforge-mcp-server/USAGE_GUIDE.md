# DevForge MCP Server v3.0 - Kullanım Rehberi

## 📚 İçindekiler
1. [Kurulum](#kurulum)
2. [Konfigürasyon](#konfigürasyon)
3. [MCP Araçları](#mcp-araçları)
4. [Kullanım Senaryoları](#kullanım-senaryoları)
5. [NotebookLM Entegrasyonu](#notebooklm-entegrasyonu)
6. [A2UI Kullanımı](#a2ui-kullanımı)
7. [SSS](#sss)

---

## Kurulum

### Gereksinimler
- Node.js 16+ 
- npm 7+
- Claude Desktop veya Claude Code

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/Srhot/AI-Tools.git
cd AI-Tools/devforge-mcp-server
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Build Yapın
```bash
npm run build
```

### Adım 4: .env Dosyası Oluşturun
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_api_key_here
NOTEBOOKLM_ENABLED=false
```

**API Key Alma:**
- Gemini: https://aistudio.google.com/app/apikey
- Claude: https://console.anthropic.com/settings/keys
- OpenAI: https://platform.openai.com/api-keys

---

## Konfigürasyon

### Claude Desktop için

**Konfigürasyon Dosyası:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**İçerik:**
```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY"
      }
    }
  }
}
```

### Standalone Claude Code için

**Konfigürasyon Dosyası:**
```
%USERPROFILE%\.claude\mcp.json
```

**İçerik:** Aynı JSON formatı (yukarıdaki gibi)

**Claude'u yeniden başlatın!**

---

## MCP Araçları

### 1. start_project
**Ne Yapar:** Yeni proje başlatır, karar matrisi oluşturur

**Parametreler:**
- `project_name`: Proje adı
- `project_type`: web, api, cli, desktop, mobile, library
- `description`: Proje açıklaması
- `requirements`: Özellik listesi (array)

**Örnek Kullanım:**
```
"DevForge ile bir e-ticaret web uygulaması oluştur. 
 Kullanıcı kaydı, ürün listeleme, sepet ve ödeme özellikleri olsun."
```

### 2. approve_architecture
**Ne Yapar:** Mimari onaylandıktan sonra Spec-Kit oluşturur

**Çıktılar:**
- `docs/CONSTITUTION.md` - Proje anayasası
- `docs/SPECIFICATION.md` - Detaylı özellikler
- `docs/TECHNICAL_PLAN.md` - Teknik plan
- `docs/TASKS.md` - Görev listesi
- `PROJECT.poml` - POML manifest

### 3. check_knowledge_base
**Ne Yapar:** NotebookLM'de proje için dokümantasyon arar

**Parametreler:**
- `project_name`: Proje adı
- `project_description`: Açıklama
- `keywords`: Anahtar kelimeler (opsiyonel)

**Örnek:**
```
"DevForge check_knowledge_base aracını kullanarak 
 'ML Model API' projesi için NotebookLM'de bilgi var mı bak"
```

### 4. generate_ui_blueprint
**Ne Yapar:** A2UI JSON blueprint oluşturur

**Parametreler:**
- `project_name`: Proje adı
- `platform`: react, flutter, react-native, web, angular, console
- `screens`: Ekran tanımları

**Örnek:**
```
"DevForge generate_ui_blueprint ile React için 
 login, dashboard ve profil ekranları oluştur"
```

### 5. generate_api_tests
**Ne Yapar:** Postman koleksiyonları üretir

**Çıktılar:**
- Postman collection.json
- Dev/Staging/Prod environments
- Newman CLI komutları

### 6. generate_frontend_prompt
**Ne Yapar:** No-code platformlar için prompt üretir

**Desteklenen Platformlar:**
- Google Stitch
- Lovable
- v0.dev
- Bolt.new

### 7. generate_bdd_tests
**Ne Yapar:** Cucumber/Gherkin testleri oluşturur

### 8-10. Checkpoint Araçları
- `create_checkpoint` - Manuel checkpoint
- `get_workflow_status` - İlerleme durumu
- `complete_task` - Görev tamamla (otomatik checkpoint)

---

## Kullanım Senaryoları

### Senaryo 1: Basit Web Uygulaması (NotebookLM'siz)

```
Kullanıcı: "DevForge MCP ile todo uygulaması oluştur"

Claude:
1. start_project çağırır
2. Mimari sorular sorar (veritabanı? framework?)
3. Cevaplarınızı aldıktan sonra approve_architecture çağırır
4. Spec-Kit oluşturur

Kullanıcı: "Tamam, şimdi bu plana göre kodu yaz"

Claude:
(Normal Claude Code yetenekleriyle kodu yazar)
```

### Senaryo 2: Kompleks Proje (NotebookLM ile)

```
Kullanıcı: "DevForge MCP ile mobil sağlık uygulaması oluştur.
           NotebookLM'deki 'Sağlık API Dokumanları' dosyasından yararlan."

Claude:
1. check_knowledge_base çağırır
2. NotebookLM'de "Sağlık API Dokumanları" notebook'unu bulur
3. Grounded, citation-backed context alır
4. start_project çağırır (zenginleştirilmiş context ile)
5. approve_architecture çağırır
6. Citation'lar dahil Spec-Kit oluşturur

Kullanıcı: "UI blueprint de oluştur"

Claude:
7. generate_ui_blueprint çağırır (Flutter için)
8. A2UI JSON döndürür

Kullanıcı: "Tamam, şimdi kodu yaz"

Claude:
(A2UI blueprint + Spec-Kit'e göre kodu yazar)
```

### Senaryo 3: Sadece UI Blueprint

```
Kullanıcı: "DevForge generate_ui_blueprint ile React Native için
           ana sayfa, kategori listesi ve ürün detay ekranı oluştur"

Claude:
1. generate_ui_blueprint çağırır
2. 3 ekran için A2UI JSON üretir
3. React Native kod snippet'leri sağlar
```

---

## NotebookLM Entegrasyonu

### Aktifleştirme

**.env:**
```env
NOTEBOOKLM_ENABLED=true
```

**Gereksinim:** `notebooklm-mcp` server çalışıyor olmalı

### Kullanım

**Manuel Kontrol:**
```
"check_knowledge_base ile 'ML Model Training' projesi için bilgi ara"
```

**Otomatik Kullanım:**
```
"DevForge ile ML uygulaması oluştur. 
 NotebookLM'deki 'TensorFlow Guide' dosyasından yararlan."
```

Claude otomatik olarak:
1. NotebookLM'de arama yapar
2. İlgili notebook bulur
3. Grounded context alır
4. Spec-Kit'e dahil eder

### Fallback

NotebookLM yoksa veya bilgi bulunamazsa:
→ Otomatik olarak Gemini API ile devam eder
→ Kullanıcıya bilgi verir

---

## A2UI Kullanımı

### Platform Seçimi

| Platform | Use Case |
|----------|----------|
| `react` | Web uygulamaları, SPAs |
| `flutter` | Cross-platform mobil |
| `react-native` | Native mobile apps |
| `web` | Vanilla web components |
| `angular` | Enterprise web apps |
| `console` | CLI uygulamaları |

### Örnek 1: React

```
"generate_ui_blueprint React için login ve dashboard ekranı"
```

**Çıktı:**
- JSON blueprint
- React TSX code
- Component breakdown

### Örnek 2: Flutter

```
"generate_ui_blueprint Flutter için 
 splash, home, profil ekranları oluştur"
```

**Çıktı:**
- JSON blueprint
- Flutter Dart code
- Widget tree

### Blueprint Kullanımı

1. **JSON Blueprint:** Diğer platformlara port edilebilir
2. **JSONL Messages:** Streaming UI render için
3. **Generated Code:** Direkt projenizde kullanabilirsiniz

---

## SSS

### S: Hangi AI provider'ı kullanmalıyım?

**C:** Gemini öneriyoruz (varsayılan). Sıralama:
1. Gemini (hızlı, ücretsiz tier)
2. Claude (yüksek kalite)
3. OpenAI (dengeli)

### S: NotebookLM zorunlu mu?

**C:** Hayır! Opsiyonel. Yoksa otomatik fallback.

### S: Oluşturulan kod production-ready mi?

**C:** Hayır. DevForge **planlama ve dokümantasyon** aracıdır. 
Kod yazmak Claude Code'un işi.

### S: Checkpoint ne işe yarar?

**C:** Context kaybını önler. Her 20-25 görevde otomatik checkpoint oluşur.

### S: Birden fazla proje olabilir mi?

**C:** Evet! Her proje kendi klasöründe:
```
C:\Users\serha\OneDrive\Desktop\devforge-projects\
  ├── project-1/
  ├── project-2/
  └── project-3/
```

### S: A2UI widget'ları özelleştirebilir miyim?

**C:** Evet! `src/generators/a2ui-catalog.ts` dosyasını düzenleyin.

### S: Hata aldım: "AI_API_KEY not provided"

**C:** `.env` dosyasında API key'inizi ayarlayın:
```env
GEMINI_API_KEY=your_key_here
```

---

## Destek

- **GitHub Issues:** https://github.com/Srhot/AI-Tools/issues
- **Documentation:** Proje içindeki Markdown dosyaları

---

**DevForge MCP v3.0** - Yapay Zeka destekli yazılım fabrikası 🚀
