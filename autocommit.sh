#!/bin/bash

# Navigate to the repository directory
cd /c/Users/admin/Netsuite

# Check if there are any changes
if [ -n "$(git status --porcelain)" ]; then
    # Add all changes to the staging area
    git add .

    # Commit the changes with a message
    git commit -m "Auto-commit: $(date)"

    # Push the changes to the remote repository
    git push origin main
else
    echo "No changes to commit"
fi
