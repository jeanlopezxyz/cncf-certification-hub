# GitHub Branch Protection as Code
# Requiere: Terraform + GitHub Provider

terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

# Configurar GitHub Provider
provider "github" {
  token = var.github_token
  owner = "jeanlopezxyz"
}

# Protección de rama main
resource "github_branch_protection" "main" {
  repository_id = "cncf-certification-hub"
  pattern       = "main"

  # Requiere PR antes de merge
  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews          = true
    require_code_owner_reviews     = false
    restrict_dismissals            = false
  }

  # Requiere status checks (CI)
  required_status_checks {
    strict = true
    contexts = [
      "quality",
      "test", 
      "build",
      "security",
      "lighthouse",
      "link-check",
      "notify"
    ]
  }

  # Aplicar a administradores
  enforce_admins = true

  # Bloquear force push y eliminación
  allows_force_pushes = false
  allows_deletions    = false

  # Sin restricciones de usuarios/equipos
  restrict_pushes {
    blocks_creations = false
  }
}

# Variables
variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

# Outputs
output "branch_protection_url" {
  value = "https://github.com/jeanlopezxyz/cncf-certification-hub/settings/branches"
}