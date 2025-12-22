# NotebookLM-MCP Minimal Backup

## 🎯 Bu Paket Nedir?

NotebookLM-MCP **kurulum dokümantasyonu**. Yeni bilgisayarda sıfırdan kurulum için gereken tüm bilgileri içerir.

**NotebookLM içeriği zaten Google'da güvende!** Bu paket sadece nasıl yeniden bağlanacağınızı gösterir.

## 📦 İçerik

```
NotebookLM-MCP-Minimal/
├── README.md                 # 📄 Hızlı başlangıç kılavuzu (bu dosya)
├── KURULUM_KILAVUZU.md       # 📘 Detaylı kurulum adımları
└── NOTEBOOK_CONFIG.json      # 📝 Notebook bilgileri ve referans
```

**Toplam boyut:** ~21 KB

## 🚀 Yeni Bilgisayarda Kurulum (3 Adım)

### 1️⃣ NotebookLM-MCP'yi Yükleyin

```bash
# Node.js 18+ gerekli (https://nodejs.org/)
npm install -g @notebooklm/mcp

# Kurulum kontrolü
notebooklm-mcp --version
```

### 2️⃣ Claude Code MCP Ayarlarını Yapın

`mcp_settings.json` dosyanızı düzenleyin:
- **Windows:** `%APPDATA%\.claude\mcp_settings.json`
- **macOS:** `~/Library/Application Support/Claude/mcp_settings.json`
- **Linux:** `~/.config/claude/mcp_settings.json`

Ekleyin:
```json
{
  "mcpServers": {
    "notebooklm-fixed": {
      "command": "npx",
      "args": ["-y", "@notebooklm/mcp@latest"],
      "env": {
        "NOTEBOOKLM_BROWSER_SHOW": "false",
        "NOTEBOOKLM_BROWSER_HEADLESS": "true"
      },
      "disabled": false
    }
  }
}
```

Claude Code'u yeniden başlatın.

### 3️⃣ Notebook'u Ekleyin ve Authentication Yapın

Claude Code'da çalıştırın:

```
Add this NotebookLM notebook:

URL: https://notebooklm.google.com/notebook/2df7e473-f783-43d5-a2df-5b1a50b8a99f
Name: Suolingo - AI Avatar Language Learning
Description: SOULINGO AI Avatar destekli yabancı dil öğrenme uygulaması. React Native, Expo, Deepgram, ElevenLabs, Gemini AI entegrasyonları ve 12 interaktif öğrenme modu içerir.
Topics: React Native, Language Learning, AI Avatar, Speech Recognition, Text-to-Speech
Use cases: When implementing learning modes, When integrating APIs (Deepgram, ElevenLabs, Gemini), When working on avatar lip-sync
```

## ✅ Test Edin

Claude Code'da çalıştırın:

```bash
# 1. Sağlık kontrolü
Check NotebookLM-MCP health status

# 2. Notebook'ları listele
List all NotebookLM notebooks

# 3. Test sorusu
Ask NotebookLM: "What are the main features of Suolingo app?"
```

Yanıt alırsanız kurulum başarılı! 🎉

## 📚 Kayıtlı Notebook

**Suolingo - AI Avatar Language Learning**
- **URL:** https://notebooklm.google.com/notebook/2df7e473-f783-43d5-a2df-5b1a50b8a99f
- **ID:** suolingo-ai-avatar-language-le
- **Konular:** React Native, Language Learning, AI Avatar, Speech Recognition, Text-to-Speech
- **Kullanım Alanları:**
  - Learning mode implementasyonları
  - API entegrasyonları (Deepgram, ElevenLabs, Gemini)
  - Avatar lip-sync çalışmaları
- **Son Kullanım:** 2025-12-18
- **Kullanım Sayısı:** 4 kez

## 🔧 Sorun Giderme

### "authenticated: false" Hatası
```
Setup NotebookLM authentication
```

### Notebook Görünmüyor
Notebook'u yukarıdaki "Add this NotebookLM notebook" komutuyla manuel olarak ekleyin.

### MCP Server Bulunamadı
1. `mcp_settings.json` syntax kontrol
2. Claude Code restart

## 🆚 Minimal vs Tam Yedek

| Özellik | Minimal (~21 KB) | Tam (~231 MB) |
|---------|------------------|---------------|
| Kurulum dokümantasyonu | ✅ | ✅ |
| Notebook URL bilgisi | ✅ (README'de) | ✅ (library.json'da) |
| Browser cache | ❌ | ✅ |
| Auth cookies | ❌ | ✅ |
| NotebookLM içeriği | ❌ (Bulutta) | ❌ (Bulutta) |
| Manuel notebook ekleme | ✅ Gerekli | ❌ Otomatik |
| Yeni auth gerekli | ✅ Evet | ❌ Hayır (belki) |
| GitHub boyut | ~21 KB | ~231 MB |
| Güvenlik | ✅ En güvenli | ⚠️ Hassas veriler |

**Minimal seçimi en mantıklısı çünkü:**
- NotebookLM içeriği zaten bulutta güvende
- library.json yeni bilgisayarda otomatik oluşur
- Yeni bilgisayarda fresh auth daha güvenli
- GitHub repo ultra-minimal kalır (~21 KB!)

## 📖 Detaylı Dokümantasyon

Tüm detaylar için **[KURULUM_KILAVUZU.md](./KURULUM_KILAVUZU.md)** dosyasına bakın.

## 📊 Paket Bilgileri

- **Oluşturma Tarihi:** 2025-12-22
- **Paket Boyutu:** ~21 KB
- **Notebook Sayısı:** 1
- **İçerik Tipi:** Sadece dokümantasyon (library.json YOK - yeni bilgisayarda otomatik oluşur)

---

**Versiyon:** 1.0 (Minimal)
**Son Güncelleme:** 2025-12-22

İyi çalışmalar! 🚀
