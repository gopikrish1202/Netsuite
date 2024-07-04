#!/bin/bash

echo "Script execution started"

# Navigate to the repository directory
cd /c/Users/admin/Netsuite
echo "Navigated to /c/Users/admin/Netsuite"

# Check if the navigation was successful
if [ $? -ne 0 ]; then
    echo "Failed to navigate to the repository directory"
    exit 1
fi

# Check if there are any changes
if [ -n "$(git status --porcelain)" ]; then
    echo "Changes detected. Staging files..."

    # Add all changes to the staging area
    git add .
    echo "Files staged"

    # Commit the changes with a message
    COMMIT_MSG="Auto-commit: $(date)"
    git commit -m "$COMMIT_MSG"
    echo "Commit command executed"

    # Check if the commit was successful
    if [ $? -eq 0 ]; then
        echo "Commit successful. Pushing to remote repository..."
        # Push the changes to the remote repository
        git push origin main

        # Check if the push was successful
        if [ $? -eq 0 ]; then
            echo "Push successful."
        else
            echo "Failed to push changes to remote repository."
        fi
    else
        echo "Commit failed."
    fi
else
    echo "No changes to commit."
fi
