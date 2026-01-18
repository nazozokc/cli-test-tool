return {
  "olimorris/codecompanion.nvim",
  cmd = { "CodeCompanion" },
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "ravitemer/codecompanion-history.nvim",
  },
  keys = {
    { "cc",  "CodeCompanion",       mode = "ca" },
    { "ccc", "CodeCompanionChat",   mode = "ca" },
    { "cca", "CodeCompanionAction", mode = "ca" },
  },
  opts = {
    ignore_warnings = true,
    adapters = {
      http = {
        ollama = function()
          return require("codecompanion.adapters").extend("ollama", {
            schema = {
              name = "qwen2.5-coder",
              model = {
                default = "qwen2.5-coder:1.5B",
              },
            },
          })
        end,
      },
    },
    interactions = {
      extensions = {
        history = {
          enabled = true,
        },
      },
    },
    config = function(_, opts)
      require("codecompanion").setup(opts)
    end,
    init = function()
      require("plugin.codecompanion.spinner"):init()
    end,
  }
}
