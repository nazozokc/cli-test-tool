return {
  {
    "williamboman/mason.nvim",
    lazy = false,
    config = true,
  },
  {
    "williamboman/mason-lspconfig.nvim",
    lazy = false,
    opts = {
      ensure_installed = {
        "clangd",
        "ts_ls",
        "html",
        "lua_ls",
      },
      automatic_installation = true,
    },
  },
  {
    "neovim/nvim-lspconfig",
    lazy = false,
    config = function()
      -- capabilities
      local capabilities = vim.lsp.protocol.make_client_capabilities()
      local ok, cmp = pcall(require, "cmp_nvim_lsp")
      if ok then
        capabilities = cmp.default_capabilities(capabilities)
      end

      -- on_attach
      local on_attach = function(_, bufnr)
        local map = function(mode, lhs, rhs)
          vim.keymap.set(mode, lhs, rhs, { buffer = bufnr })
        end

        map("n", "K", vim.lsp.buf.hover)
        map("n", "<leader>gd", vim.lsp.buf.definition)
        map("n", "<leader>gr", vim.lsp.buf.references)
        map("n", "<leader>ca", vim.lsp.buf.code_action)
        map("n", "<leader>gf", vim.lsp.buf.format)
        map("n", "<leader>rn", vim.lsp.buf.rename)
      end

      vim.lsp.config.clangd = {
        capabilities = capabilities,
        on_attach = on_attach,
      }

      vim.lsp.config.ts_ls = {
        capabilities = capabilities,
        on_attach = on_attach,
      }

      vim.lsp.config.html = {
        capabilities = capabilities,
        on_attach = on_attach,
      }

      vim.lsp.config.lua_ls = {
        capabilities = capabilities,
        on_attach = on_attach,
        settings = {
          Lua = {
            diagnostics = { globals = { "vim" } },
          },
        },
      }

      -- 有効化
      vim.lsp.enable({
        "clangd",
        "ts_ls",
        "html",
        "lua_ls",
      })
    end,
  },
}
