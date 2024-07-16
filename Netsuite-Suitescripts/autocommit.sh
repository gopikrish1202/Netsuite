#!/bin/bash

# Function to handle Git operations
commit_and_push() {
    local DIR=$1
    local REMOTE_URL=$2

    echo "Navigated to ${DIR}"

    # Navigate to the repository directory
    cd "$DIR" || { echo "Failed to navigate to ${DIR}"; exit 1; }

    # Check if there are any changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "Changes detected in ${DIR}. Staging files..."

        # Add all changes to the staging area
        git add . || { echo "Failed to stage files in ${DIR}"; exit 1; }
        echo "Files staged in ${DIR}"

        # Commit the changes with a message
        COMMIT_MSG="Auto-commit: $(date)"
        git commit -m "$COMMIT_MSG" || { echo "Commit failed in ${DIR}"; exit 1; }
        echo "Commit successful in ${DIR}"

        # Push the changes to the remote repository
        echo "Pushing to remote repository..."
        git push "$REMOTE_URL" main || { echo "Failed to push changes to remote repository for ${DIR}"; exit 1; }
        echo "Push successful for ${DIR}."
    else
        echo "No changes to commit in ${DIR}."
    fi
}

echo "Script execution started"

# Directory paths
DIRS=(
    "/c/Users/admin/Netsuite/Netsuite-Suitescripts"
    "/c/Users/admin/Netsuite/Restlet-Suitescripts"
)

# Remote URLs for the repositories
REMOTE_URLS=(
    "https://github.com/gopikrish1202/Netsuite/Netsuite-Suitescripts.git"
    "https://github.com/gopikrish1202/Netsuite/Restlet-Suitescripts.git"
)

# Iterate over directories and process each one
for i in "${!DIRS[@]}"; do
    DIR=${DIRS[$i]}
    REMOTE_URL=${REMOTE_URLS[$i]}

    # Perform Git operations
    commit_and_push "$DIR" "$REMOTE_URL"
done

echo "Script execution finished"
