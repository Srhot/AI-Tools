# NotebookLM-MCP Kurulum ve Yedekten Geri Yükleme Kılavuzu

## 📋 İçindekiler
1. [Gereksinimler](#gereksinimler)
2. [Yeni Bilgisayarda İlk Kurulum](#yeni-bilgisayarda-ilk-kurulum)
3. [Yedek Dosyaların Geri Yüklenmesi](#yedek-dosyaların-geri-yüklenmesi)
4. [Claude Code ile Entegrasyon](#claude-code-ile-entegrasyon)
5. [Notebook Bağlantılarının Yapılandırılması](#notebook-bağlantılarının-yapılandırılması)
6. [Test ve Doğrulama](#test-ve-doğrulama)
7. [Sorun Giderme](#sorun-giderme)

---

## 🔧 Gereksinimler

### Yazılım Gereksinimleri
- **Node.js** 18.0 veya üzeri ([İndir](https://nodejs.org/))
- **npm** (Node.js ile birlikte gelir)
- **Claude Code CLI** (Anthropic)
- **Git** (GitHub'dan indirmek için)
- **Google hesabı** (NotebookLM erişimi için)

### Sistem Gereksinimleri
- Windows 10/11, macOS 10.15+, veya Linux
- En az 500 MB boş disk alanı
- İnternet bağlantısı

---

## 🚀 Yeni Bilgisayarda İlk Kurulum

### Adım 1: GitHub Reposunu Klonlayın

```bash
# Masaüstünde AI Tools klasörü oluşturun
cd Desktop
mkdir "AI Tools"
cd "AI Tools"

# GitHub'dan projeyi klonlayın
git clone [GITHUB_REPO_URL]
cd NotebookLM-MCP
```

### Adım 2: Node.js ve npm Kontrolü

```bash
# Node.js versiyonunu kontrol edin
node --version
# Çıktı: v18.0.0 veya üzeri olmalı

# npm versiyonunu kontrol edin
npm --version
```

**Not:** Eğer Node.js yüklü değilse, [nodejs.org](https://nodejs.org/) adresinden LTS versiyonunu indirin.

### Adım 3: NotebookLM-MCP Global Kurulumu

```bash
# NotebookLM-MCP'yi global olarak yükleyin
npm install -g @notebooklm/mcp

# Kurulum kontrolü
notebooklm-mcp --version
```

**Alternatif:** npx kullanarak (kurulum gerektirmez):
```bash
npx @notebooklm/mcp --version
```

---

## 📦 Yedek Dosyaların Geri Yüklenmesi

### Windows için:

#### Adım 1: Yedek Dosyalarının Konumunu Belirleyin

GitHub'dan indirilen dosyalar şu konumda olmalı:
```
Desktop\AI Tools\NotebookLM-MCP\
├── Local\      (AppData\Local için yedek)
├── Roaming\    (AppData\Roaming için yedek)
└── KURULUM_KILAVUZU.md (bu dosya)
```

#### Adım 2: Dosyaları Geri Yükleyin (PowerShell)

**ÖNEMLİ:** Tüm Chrome/Chromium pencerelerini kapatın!

```powershell
# PowerShell'i Yönetici olarak çalıştırın

# 1. Local klasörünü geri yükle
Copy-Item -Path "Desktop\AI Tools\NotebookLM-MCP\Local\*" `
          -Destination "$env:LOCALAPPDATA\notebooklm-mcp\" `
          -Recurse -Force

# 2. Roaming klasörünü geri yükle
Copy-Item -Path "Desktop\AI Tools\NotebookLM-MCP\Roaming\*" `
          -Destination "$env:APPDATA\notebooklm-mcp\" `
          -Recurse -Force
```

#### Adım 3: Dosyaların Doğru Kopyalandığını Kontrol Edin

```powershell
# Local klasörü kontrolü
Test-Path "$env:LOCALAPPDATA\notebooklm-mcp"
# Çıktı: True olmalı

# Roaming klasörü kontrolü
Test-Path "$env:APPDATA\notebooklm-mcp"
# Çıktı: True olmalı

# Library dosyası kontrolü (en önemli!)
Test-Path "$env:APPDATA\notebooklm-mcp\library.json"
# Çıktı: True olmalı
```

### macOS/Linux için:

```bash
# macOS
cp -R "Desktop/AI Tools/NotebookLM-MCP/Local/"* \
      "$HOME/Library/Application Support/notebooklm-mcp/"

cp -R "Desktop/AI Tools/NotebookLM-MCP/Roaming/"* \
      "$HOME/Library/Application Support/notebooklm-mcp/"

# Linux
cp -R "Desktop/AI Tools/NotebookLM-MCP/Local/"* \
      "$HOME/.config/notebooklm-mcp/"

cp -R "Desktop/AI Tools/NotebookLM-MCP/Roaming/"* \
      "$HOME/.config/notebooklm-mcp/"
```

---

## 🔗 Claude Code ile Entegrasyon

### Adım 1: Claude Code Ayar Dosyasını Düzenleyin

Claude Code MCP ayarları genellikle şu konumdadır:
- **Windows:** `%APPDATA%\.claude\mcp_settings.json`
- **macOS:** `~/Library/Application Support/Claude/mcp_settings.json`
- **Linux:** `~/.config/claude/mcp_settings.json`

### Adım 2: MCP Ayarlarını Ekleyin

`mcp_settings.json` dosyasını açın ve şunu ekleyin:

```json
{
  "mcpServers": {
    "notebooklm-fixed": {
      "command": "npx",
      "args": [
        "-y",
        "@notebooklm/mcp@latest"
      ],
      "env": {
        "NOTEBOOKLM_BROWSER_SHOW": "false",
        "NOTEBOOKLM_BROWSER_HEADLESS": "true"
      },
      "disabled": false
    }
  }
}
```

**Not:** Eğer dosya yoksa, yukarıdaki içeriği tümüyle kullanın. Varsa, sadece `"notebooklm-fixed"` bölümünü `mcpServers` içine ekleyin.

### Adım 3: Claude Code'u Yeniden Başlatın

```bash
# Claude Code'u kapatın ve yeniden açın
# veya terminal üzerinden:
claude-code restart
```

---

## 📚 Notebook Bağlantılarının Yapılandırılması

### Mevcut Notebook Bilgileri

Yedekte kayıtlı notebook:

**1. Suolingo - AI Avatar Language Learning**
- **URL:** https://notebooklm.google.com/notebook/2df7e473-f783-43d5-a2df-5b1a50b8a99f
- **Konular:** React Native, Language Learning, AI Avatar, Speech Recognition, Text-to-Speech
- **Kullanım Alanları:**
  - Learning mode implementasyonları
  - API entegrasyonları (Deepgram, ElevenLabs, Gemini)
  - Avatar lip-sync çalışmaları

### Yeni Bilgisayarda Notebook'ları Aktive Etme

#### Yöntem 1: Otomatik (Yedekten Geri Yükleme Yaptıysanız)

Eğer yukarıdaki adımları doğru yaptıysanız, `library.json` dosyanız zaten geri yüklendi ve notebook'lar otomatik olarak tanınacaktır.

```bash
# Claude Code içinde test edin:
# NotebookLM MCP'nin çalıştığını doğrulamak için
```

Claude Code'da şu komutu çalıştırın:
```
List all my NotebookLM notebooks
```

#### Yöntem 2: Manuel Ekleme (Gerekirse)

Eğer notebook'lar görünmüyorsa, Claude Code'da şöyle ekleyin:

```
Add this NotebookLM notebook:
URL: https://notebooklm.google.com/notebook/2df7e473-f783-43d5-a2df-5b1a50b8a99f
Name: Suolingo - AI Avatar Language Learning
Description: SOULINGO AI Avatar destekli yabancı dil öğrenme uygulaması. React Native, Expo, Deepgram, ElevenLabs, Gemini AI entegrasyonları ve 12 interaktif öğrenme modu içerir.
Topics: React Native, Language Learning, AI Avatar, Speech Recognition, Text-to-Speech
Use cases: When implementing learning modes, When integrating APIs (Deepgram, ElevenLabs, Gemini), When working on avatar lip-sync
```

---

## ✅ Test ve Doğrulama

### 1. MCP Server Sağlık Kontrolü

Claude Code'da çalıştırın:

```
Check NotebookLM-MCP health status
```

Beklenen çıktı:
```json
{
  "authenticated": true,
  "active_sessions": 0,
  "notebooks_count": 1
}
```

**Önemli:** Eğer `authenticated: false` ise, authentication kurulumu gereklidir.

### 2. Authentication Kurulumu (Gerekirse)

```
Setup NotebookLM authentication
```

Bu komut bir tarayıcı penceresi açacak ve Google hesabınızla giriş yapmanızı isteyecektir.

### 3. Notebook Listesini Kontrol Edin

```
List all NotebookLM notebooks
```

Beklenen çıktı:
```
1. Suolingo - AI Avatar Language Learning
   Topics: React Native, Language Learning, AI Avatar...
```

### 4. Basit Bir Soru Sorun

```
Ask NotebookLM: "What are the main features of Suolingo app?"
```

Eğer yanıt alırsanız, kurulum başarılıdır! 🎉

---

## 🔧 Sorun Giderme

### Sorun 1: "authenticated: false" Hatası

**Çözüm:**
```bash
# Claude Code içinde:
Setup NotebookLM authentication
```

Tarayıcı açılacak, Google hesabınızla giriş yapın.

### Sorun 2: Notebook'lar Görünmüyor

**Çözüm A:** Library dosyasını kontrol edin
```powershell
# Windows PowerShell
Get-Content "$env:APPDATA\notebooklm-mcp\library.json"
```

**Çözüm B:** Manuel olarak ekleyin (yukarıdaki "Manuel Ekleme" bölümüne bakın)

### Sorun 3: "MCP Server Not Found" Hatası

**Çözüm:**
1. `mcp_settings.json` dosyasının doğru konumda olduğundan emin olun
2. JSON syntax'ının doğru olduğunu kontrol edin (virgüllere dikkat!)
3. Claude Code'u yeniden başlatın

### Sorun 4: Browser/Chrome Hataları

**Çözüm:**
```bash
# Tüm Chrome/Chromium süreçlerini kapatın
# Windows:
taskkill /F /IM chrome.exe /T

# Sonra cleanup yapın (Claude Code içinde):
Cleanup NotebookLM data but preserve library
```

### Sorun 5: Rate Limit Hatası (50 sorgu/gün aşımı)

**Çözüm A:** Farklı bir Google hesabı kullanın
```bash
# Claude Code içinde:
Re-authenticate NotebookLM with different account
```

**Çözüm B:** Google AI Premium'a yükseltin (5x daha fazla limit)

---

## 📊 Yedekleme Yapısı

```
NotebookLM-MCP/
│
├── Local/                          # AppData\Local\notebooklm-mcp
│   └── Data/
│       ├── browser_state/          # Tarayıcı oturum verileri
│       ├── chrome_profile/         # Chrome profil verileri
│       └── chrome_profile_instances/
│
├── Roaming/                        # AppData\Roaming\notebooklm-mcp
│   ├── Config/
│   └── library.json               # 🔥 EN ÖNEMLİ DOSYA - Notebook kayıtları
│
└── KURULUM_KILAVUZU.md            # Bu dosya
```

### Kritik Dosyalar

1. **library.json** (Roaming klasöründe)
   - Tüm notebook bağlantılarını içerir
   - ID, URL, isim, açıklama, topics, use_cases
   - Bu dosya kaybolursa, notebook'ları manuel olarak yeniden eklemeniz gerekir

2. **browser_state/** (Local klasöründe)
   - Google authentication cookie'leri
   - Oturum verileri

3. **chrome_profile/** (Local klasöründe)
   - Tarayıcı profil ayarları
   - Cached veriler

---

## 🎯 Hızlı Başlangıç Özeti

1. ✅ Node.js 18+ yükleyin
2. ✅ GitHub'dan projeyi klonlayın
3. ✅ `npm install -g @notebooklm/mcp`
4. ✅ Yedek dosyaları AppData'ya kopyalayın
5. ✅ `mcp_settings.json` dosyasını yapılandırın
6. ✅ Claude Code'u yeniden başlatın
7. ✅ "Check NotebookLM-MCP health" ile test edin
8. ✅ Gerekirse authentication yapın
9. ✅ "List all NotebookLM notebooks" ile doğrulayın

---

## 📞 Destek ve Kaynaklar

- **NotebookLM:** https://notebooklm.google/
- **Claude Code Docs:** https://claude.com/claude-code
- **GitHub Issues:** [Proje GitHub URL'si]

---

## 📝 Notlar

- **Yedekleme Tarihi:** 2025-12-22
- **Toplam Boyut:** ~231 MB
- **Kayıtlı Notebook Sayısı:** 1
- **Son Kullanım:** 2025-12-18

---

## ⚠️ Önemli Uyarılar

1. **Tüm Chrome/Chromium pencerelerini** kapatmadan dosya kopyalama yapmayın
2. **library.json dosyasını** mutlaka yedekleyin - bu dosya en kritik dosyadır
3. **Google hesap erişimi** gereklidir - aynı hesabı kullandığınızdan emin olun
4. **Rate limit:** Ücretsiz hesapta günde 50 sorgu limiti vardır
5. **Güvenlik:** Authentication verileri hassastır, güvenli saklayın

---

**Son Güncelleme:** 2025-12-22
**Versiyon:** 1.0
**Hazırlayan:** Claude Code Assistant

---

İyi çalışmalar! 🚀
