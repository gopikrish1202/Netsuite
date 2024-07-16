#!/bin/bash

# Function to handle Git operations
commit_and_push() {
    local DIR=$1
    local REPO_URL=$2

    echo "Navigated to ${DIR}"

    # Navigate to the repository directory
    cd "$DIR" || { echo "Failed to navigate to ${DIR}"; exit 1; }

    # Check if there are any changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "Changes detected in ${DIR}. Staging files..."

        # Add all changes to the staging area
        git add .
        echo "Files staged in ${DIR}"

        # Commit the changes with a message
        COMMIT_MSG="Auto-commit: $(date)"
        git commit -m "$COMMIT_MSG"
        echo "Commit command executed in ${DIR}"

        # Check if the commit was successful
        if [ $? -eq 0 ]; then
            echo "Commit successful in ${DIR}. Pushing to remote repository..."

            # Push the changes to the remote repository
            git push "$REPO_URL" main

            # Check if the push was successful
            if [ $? -eq 0 ]; then
                echo "Push successful for ${DIR}."
            else
                echo "Failed to push changes to remote repository for ${DIR}."
            fi
        else
            echo "Commit failed in ${DIR}."
        fi
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

# Remote URL for the repository
REPO_URL="https://github.com/gopikrish1202/Netsuite-Suitescripts.git"

# Iterate over directories and process each one
for DIR in "${DIRS[@]}"; do
    commit_and_push "$DIR" "$REPO_URL"
done

echo "Script execution finished"
