// build.js

const { execSync } = require('child_process');
const path = require('path');

// 서브 프로젝트 디렉토리 목록
const subProjects = ['duice-pagination', 'duice-marked'];

// 루트 프로젝트의 경로
const rootPath = path.resolve(__dirname);

// 각 서브 프로젝트의 tsc 명령어 실행
subProjects.forEach(subProject => {
    const subProjectPath = path.join(rootPath, subProject);

    console.log(`Building ${subProject}...`);

    // 서브 프로젝트 디렉토리로 이동
    process.chdir(subProjectPath);

    // tsc 명령어 실행
    try {
        execSync('tsc', { stdio: 'inherit' });
        console.log(`${subProject} build completed.\n`);
    } catch (error) {
        console.error(`Error building ${subProject}: ${error.message}`);
        process.exit(1);
    }
});

// 루트 디렉토리로 돌아가기
process.chdir(rootPath);

console.log('Build process completed for all subprojects.');

