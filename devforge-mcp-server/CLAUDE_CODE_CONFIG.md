# Claude MCP Konfigürasyonu

Bu belge, DevForge MCP Server'ı hem **Claude Desktop** uygulamasında (Chat + Code sekmeleri) hem de **standalone Claude Code** ile nasıl kullanacağınızı açıklar.

---

## 📍 Kurulum Adımları

### 1. Bağımlılıkları Yükleyin

```powershell
cd d:\AI-Tools\devforge-mcp-server
npm install
npm run build
```

### 2. .env Dosyasını Oluşturun

`.env.example` dosyasını `.env` olarak kopyalayın ve API key'inizi girin:

```powershell
copy .env.example .env
```

`.env` dosyasını düzenleyin:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. MCP Konfigürasyonu

#### Seçenek A: Claude Desktop Uygulaması (Chat + Code Sekmeleri)

Claude Desktop uygulamasındaki hem Chat hem de Code sekmeleri aynı konfigürasyonu kullanır.

**Konfigürasyon Dosyası:**
```powershell
%APPDATA%\Claude\claude_desktop_config.json
```

Dosyayı açın veya oluşturun:
```powershell
notepad $env:APPDATA\Claude\claude_desktop_config.json
```

#### Seçenek B: Standalone Claude Code

Standalone Claude Code kullanıyorsanız, terminal'de şu komutu çalıştırın:

```powershell
claude mcp add devforge
```

Veya manuel olarak `mcp.json` dosyasını düzenleyin:

**Konfigürasyon Dosyası:**
```powershell
%USERPROFILE%\.claude\mcp.json
```

Dosyayı açın:
```powershell
notepad $env:USERPROFILE\.claude\mcp.json
```

---

## 🔧 Konfigürasyon Örnekleri

### Claude Desktop App (`claude_desktop_config.json`)

#### Gemini ile Kullanım (Önerilen)

```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY_HERE"
      }
    }
  }
}
```

#### Claude API ile Kullanım

```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "claude",
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE"
      }
    }
  }
}
```

#### OpenAI ile Kullanım

```json
{
  "mcpServers": {
    "devforge": {
      "command": "node",
      "args": ["d:\\AI-Tools\\devforge-mcp-server\\build\\index.js"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "YOUR_OPENAI_API_KEY_HERE",
        "AI_MODEL": "gpt-4-turbo"
      }
    }
  }
}
```

### Standalone Claude Code (`mcp.json`)

Standalone Claude Code için **aynı konfigürasyon formatını** kullanabilirsiniz. Tek fark dosya konumu:
- Claude Desktop: `%APPDATA%\Claude\claude_desktop_config.json`
- Standalone Code: `%USERPROFILE%\.claude\mcp.json`

---

## 🔑 Environment Variables

| Değişken | Açıklama | Zorunlu | Varsayılan |
|----------|----------|---------|------------|
| `AI_PROVIDER` | AI sağlayıcı: `gemini`, `claude`, `openai` | Hayır | `claude` |
| `GEMINI_API_KEY` | Google Gemini API anahtarı | Gemini için Evet | - |
| `ANTHROPIC_API_KEY` | Anthropic Claude API anahtarı | Claude için Evet | - |
| `OPENAI_API_KEY` | OpenAI API anahtarı | OpenAI için Evet | - |
| `AI_API_KEY` | Genel API anahtarı (tüm sağlayıcılar) | Alternatif | - |
| `AI_MODEL` | Kullanılacak model | Hayır | Sağlayıcıya göre |

### Varsayılan Modeller

| Sağlayıcı | Varsayılan Model |
|-----------|------------------|
| `gemini` | `gemini-2.0-flash` |
| `claude` | `claude-sonnet-4-20250514` |
| `openai` | `gpt-4-turbo` |

---

## 🧪 Test Etme

MCP'nin doğru çalıştığını test etmek için:

### 1. Build Kontrolü
```powershell
cd d:\AI-Tools\devforge-mcp-server
npm run build
```

### 2. Manuel Çalıştırma
```powershell
$env:AI_PROVIDER="gemini"
$env:GEMINI_API_KEY="your_key_here"
node build/index.js
```

Başarılı çıktı:
```
🤖 DevForge MCP Server - Complete AI Software Factory
📡 AI Provider: gemini
🎯 Model: gemini-2.0-flash
✨ Features: Decision Matrix, Spec-Kit, POML, API Testing, BDD, Context Preservation
DevForge MCP Server running on stdio
```

---

## 🎯 Kullanım

Claude Code'da MCP aktif olduktan sonra şu araçları kullanabilirsiniz:

1. **start_project** - Yeni proje başlatın
2. **approve_architecture** - Mimariyi onaylayın
3. **generate_api_tests** - API testleri oluşturun
4. **ask_frontend_questions** - Frontend soruları sorun
5. **generate_frontend_prompt** - Frontend promptları oluşturun
6. **generate_bdd_tests** - BDD testleri oluşturun
7. **create_checkpoint** - Checkpoint oluşturun
8. **get_workflow_status** - İş akışı durumunu görün
9. **complete_task** - Görevi tamamlayın

---

## 🔗 Yararlı Linkler

- [Gemini API Key Alma](https://aistudio.google.com/app/apikey)
- [Claude API Key Alma](https://console.anthropic.com/settings/keys)
- [OpenAI API Key Alma](https://platform.openai.com/api-keys)
- [MCP Dokümantasyonu](https://modelcontextprotocol.io/)
