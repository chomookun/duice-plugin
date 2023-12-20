const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(__dirname);
const subProjects = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.'))
    .map(dirent => dirent.name);

// tsc sub project
subProjects.forEach(subProject => {
    const subProjectPath = path.join(rootPath, subProject);
    console.log(`Building ${subProject}...`);

    // cd
    process.chdir(subProjectPath);

    // tsc
    try {
        execSync('tsc', { stdio: 'inherit' });
        console.log(`${subProject} build completed.\n`);
    } catch (error) {
        console.error(`Error building ${subProject}: ${error.message}`);
        process.exit(1);
    }
});

// move root dir
process.chdir(rootPath);
console.log('Build process completed for all subprojects.');
