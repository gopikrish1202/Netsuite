#!/bin/bash

# Function to handle Git operations
commit_and_push() {
    local DIR=$1

    echo "Navigated to ${DIR}"

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
            git push origin main

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

# Function to commit and push twice
double_commit_and_push() {
    local DIR=$1
    local REMOTE_URL=$2

    # Set the remote URL if it doesn't exist
    if ! git remote get-url origin &>/dev/null; then
        git remote add origin "$REMOTE_URL"
        echo "Remote URL set for ${DIR}"
    fi

    # First commit and push
    commit_and_push "$DIR"

    # Check if there are any changes again
    if [ -n "$(git status --porcelain)" ]; then
        echo "Changes detected after first push in ${DIR}. Performing second commit and push..."

        # Second commit and push
        commit_and_push "$DIR"
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
    "https://github.com/gopikrish1202/Netsuite.git"
    "https://github.com/gopikrish1202/Netsuite.git"
)

# Iterate over directories and process each one
for i in "${!DIRS[@]}"; do
    DIR=${DIRS[$i]}
    REMOTE_URL=${REMOTE_URLS[$i]}

    # Navigate to the repository directory
    cd "$DIR"
    if [ $? -ne 0 ]; then
        echo "Failed to navigate to ${DIR}"
        exit 1
    fi

    # Perform double commit and push
    double_commit_and_push "$DIR" "$REMOTE_URL"
done

echo "Script execution finished"
