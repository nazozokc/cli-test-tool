return {
  "hrsh7th/nvim-cmp",
  dependencies = {
    -- 補完ソース
    "hrsh7th/cmp-nvim-lsp",
    "hrsh7th/cmp-buffer",
    "hrsh7th/cmp-path",
    "hrsh7th/cmp-cmdline",
    "hrsh7th/cmp-calc",
    "vim-denops/denops.vim",
    "vim-skk/skkeleton",

    -- denippet
    "uga-rosa/denippet.vim",
    "uga-rosa/cmp-denippet",
    "ryoppippi/denippet-autoimport-vscode",

  },

  config = function()
    local cmp = require("cmp")

    ------------------------------------------------------------------
    -- denippet 初期設定
    ------------------------------------------------------------------
    vim.g.denippet_snippet_dirs = {
      vim.fn.stdpath("config") .. "/snippets",
    }

    ------------------------------------------------------------------
    -- ハイライト
    ------------------------------------------------------------------
    vim.api.nvim_set_hl(0, "CmpGhostSnippet", {
      fg = "#727169",
      italic = true,
    })

    vim.api.nvim_set_hl(0, "CmpSnippetPreview", {
      fg = "#6e738d",
      italic = true,
    })

    ------------------------------------------------------------------
    -- cmp 本体
    ------------------------------------------------------------------
    cmp.setup({
      preselect = cmp.PreselectMode.Item,

      snippet = {
        expand = function(args)
          vim.fn["denippet#anonymous"](args.body)
        end,
      },

      window = {
        completion = cmp.config.window.bordered(),
        documentation = cmp.config.window.bordered(),
      },

      formatting = {
        fields = { "kind", "abbr", "menu" },
        format = function(entry, item)
          local icons = {
            Function = "󰊕",
            Snippet  = "",
          }

          item.kind = (icons[item.kind] or "") .. " " .. item.kind
          item.menu = ({
            denippet = "[SNIP]",
            nvim_lsp = "[LSP]",
            buffer = "[BUF]",
            path = "[PATH]",
          })[entry.source.name]

          return item
        end,
      },

      mapping = cmp.mapping.preset.insert({
        ["<C-Space>"] = cmp.mapping.complete(),
        ["<CR>"] = cmp.mapping.confirm({ select = true }),

        ["<Tab>"] = function(fallback)
          if cmp.visible() then
            cmp.confirm({ select = true })
          elseif vim.fn["denippet#jumpable"]() == 1 then
            vim.fn["denippet#jump"]()
          else
            fallback()
          end
        end,

        ["<S-Tab>"] = function(fallback)
          if vim.fn["denippet#jumpable"](-1) == 1 then
            vim.fn["denippet#jump"](-1)
          else
            fallback()
          end
        end,
      }),

      sources = {
        { name = "denippet", priority = 1000 },
        { name = "nvim_lsp", priority = 900 },
        { name = "path",     priority = 500 },
        { name = "buffer",   priority = 250 },
      },

      experimental = {
        ghost_text = {
          hl_group = "CmpGhostSnippet",
        },
      },
    })

    ------------------------------------------------------------------
    -- cmdline
    ------------------------------------------------------------------
    cmp.setup.cmdline("/", {
      mapping = cmp.mapping.preset.cmdline(),
      sources = {
        { name = "buffer" },
      },
    })

    cmp.setup.cmdline(":", {
      mapping = cmp.mapping.preset.cmdline(),
      sources = cmp.config.sources(
        { { name = "path" } },
        { { name = "cmdline" } }
      ),
    })
  end,
}
