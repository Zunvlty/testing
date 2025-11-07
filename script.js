// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxEWqOwYtHK8rrmhIicUvui18mrJfitD4",
  authDomain: "e-learning-tech.firebaseapp.com",
  projectId: "e-learning-tech",
  storageBucket: "e-learning-tech.firebasestorage.app",
  messagingSenderId: "518784757521",
  appId: "1:518784757521:web:96e824d6001dfad67166b0",
  measurementId: "G-XGXCZWDXYF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Platform Pembelajaran TKJ - JavaScript Logic

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });
    
    // Tab Logic for Simulation and Leaderboard
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const boardType = this.getAttribute('data-board');
            
            // If it's a simulation tab
            if (tabId) {
                // Update active tab button
                tabBtns.forEach(tab => {
                    if (tab.getAttribute('data-tab')) {
                        tab.classList.remove('active');
                    }
                });
                this.classList.add('active');
                
                // Show target tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${tabId}-tab`) {
                        content.classList.add('active');
                    }
                });
            }
            
            // If it's a leaderboard tab
            if (boardType) {
                // Update active leaderboard tab
                tabBtns.forEach(tab => {
                    if (tab.getAttribute('data-board')) {
                        tab.classList.remove('active');
                    }
                });
                this.classList.add('active');
                
                // Update leaderboard content based on type
                updateLeaderboard(boardType);
            }
        });
    });
    
    // Absensi Logic
    const absensiBtn = document.getElementById('btn-absensi');
    if (absensiBtn) {
        absensiBtn.addEventListener('click', function() {
            // Simulate API call for attendance
            const statusBadge = document.querySelector('.attendance-status .status-badge');
            const statusText = document.querySelector('.attendance-status p');
            
            // Show loading state
            absensiBtn.textContent = 'Memproses...';
            absensiBtn.disabled = true;
            
            setTimeout(() => {
                // Update UI
                statusBadge.textContent = 'Hadir';
                statusBadge.className = 'status-badge present';
                statusText.textContent = 'Anda telah absen hari ini';
                
                // Reset button
                absensiBtn.textContent = 'Absen Sekarang';
                absensiBtn.disabled = false;
                
                // Add XP (simulated)
                addXP(10, 'Absensi');
                
                // Show success notification
                showNotification('Absensi berhasil! +10 XP', 'success');
            }, 1500);
        });
    }
    
    // Quiz Logic
    const submitQuizBtn = document.getElementById('submit-quiz');
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="quiz1"]:checked');
            
            if (!selectedOption) {
                showNotification('Pilih jawaban terlebih dahulu!', 'error');
                return;
            }
            
            // Check answer (simplified)
            if (selectedOption.value === 'b') {
                showNotification('Jawaban benar! +20 XP', 'success');
                addXP(20, 'Quiz Jaringan Dasar');
            } else {
                showNotification('Jawaban salah, coba lagi!', 'error');
            }
        });
    }
    
    // CLI Simulator Logic
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');
    
    if (cliInput) {
        cliInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                if (command) {
                    processCommand(command);
                    this.value = '';
                }
            }
        });
    }
    
    // Network Simulation Logic
    const testConnectionBtn = document.getElementById('test-connection');
    const cableTypeSelect = document.getElementById('cable-type');
    const connectionResult = document.getElementById('connection-result');
    
    if (testConnectionBtn) {
        testConnectionBtn.addEventListener('click', function() {
            const cableType = cableTypeSelect.value;
            const pc1 = document.getElementById('pc1');
            const pc2 = document.getElementById('pc2');
            const cable = document.getElementById('cable');
            
            // Reset styles
            pc1.style.borderColor = '';
            pc2.style.borderColor = '';
            cable.style.backgroundColor = '';
            
            // Simulate connection test
            testConnectionBtn.textContent = 'Testing...';
            testConnectionBtn.disabled = true;
            
            setTimeout(() => {
                // Determine connection result based on cable type
                let isConnected = false;
                let resultText = '';
                
                if (cableType === 'straight') {
                    // Straight cable should connect different device types
                    // For simulation, we'll assume PC to PC with straight cable fails
                    isConnected = false;
                    resultText = 'Koneksi gagal! Kabel straight digunakan untuk menghubungkan perangkat yang berbeda (misal: PC ke Switch)';
                } else {
                    // Cross cable should connect same device types
                    isConnected = true;
                    resultText = 'Koneksi berhasil! Kabel cross tepat untuk menghubungkan dua PC';
                }
                
                // Update UI based on result
                if (isConnected) {
                    pc1.style.borderColor = 'var(--success-color)';
                    pc2.style.borderColor = 'var(--success-color)';
                    cable.style.backgroundColor = 'var(--success-color)';
                    connectionResult.innerHTML = `<p style="color: var(--success-color)">${resultText}</p>`;
                    addXP(15, 'Simulasi Jaringan');
                } else {
                    pc1.style.borderColor = 'var(--danger-color)';
                    pc2.style.borderColor = 'var(--danger-color)';
                    cable.style.backgroundColor = 'var(--danger-color)';
                    connectionResult.innerHTML = `<p style="color: var(--danger-color)">${resultText}</p>`;
                }
                
                // Reset button
                testConnectionBtn.textContent = 'Test Koneksi';
                testConnectionBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Security Simulation Logic
    const startAttackBtn = document.getElementById('start-attack');
    const stopAttackBtn = document.getElementById('stop-attack');
    const trafficBar = document.querySelector('.traffic-bar');
    const trafficText = document.querySelector('.traffic-indicator span');
    
    if (startAttackBtn) {
        startAttackBtn.addEventListener('click', function() {
            // Simulate DDoS attack
            trafficBar.style.setProperty('--traffic-height', '100%');
            trafficBar.style.backgroundColor = 'var(--danger-color)';
            trafficText.textContent = 'Serangan DDoS Terdeteksi!';
            trafficText.style.color = 'var(--danger-color)';
            
            // Disable start button, enable stop button
            startAttackBtn.disabled = true;
            stopAttackBtn.disabled = false;
            
            showNotification('Simulasi serangan DDoS dimulai', 'warning');
        });
    }
    
    if (stopAttackBtn) {
        stopAttackBtn.addEventListener('click', function() {
            // Stop attack simulation
            trafficBar.style.setProperty('--traffic-height', '30%');
            trafficBar.style.backgroundColor = 'var(--success-color)';
            trafficText.textContent = 'Lalu Lintas Normal';
            trafficText.style.color = 'var(--success-color)';
            
            // Enable start button, disable stop button
            startAttackBtn.disabled = false;
            stopAttackBtn.disabled = true;
            
            showNotification('Serangan DDoS dihentikan', 'success');
            addXP(25, 'Simulasi Keamanan');
        });
    }
    
    // Leaderboard Data
    const leaderboardData = {
        global: [
            { rank: 1, name: 'Ahmad Rizki', xp: 3450, level: 8 },
            { rank: 2, name: 'Siti Nurhaliza', xp: 3200, level: 7 },
            { rank: 3, name: 'Budi Santoso', xp: 2980, level: 7 },
            { rank: 4, name: 'Dewi Lestari', xp: 2750, level: 6 },
            { rank: 5, name: 'Joko Widodo', xp: 2600, level: 6 },
            { rank: 6, name: 'Maya Sari', xp: 2450, level: 6 },
            { rank: 7, name: 'Rizky Pratama', xp: 2300, level: 5 },
            { rank: 8, name: 'Nina Astuti', xp: 2150, level: 5 },
            { rank: 9, name: 'Fajar Nugroho', xp: 2000, level: 5 },
            { rank: 10, name: 'Lina Marlina', xp: 1850, level: 4 }
        ],
        class: [
            { rank: 1, name: 'Ahmad Rizki', xp: 3450, level: 8 },
            { rank: 2, name: 'Siti Nurhaliza', xp: 3200, level: 7 },
            { rank: 3, name: 'Budi Santoso', xp: 2980, level: 7 },
            { rank: 4, name: 'Dewi Lestari', xp: 2750, level: 6 },
            { rank: 5, name: 'Andi Wijaya', xp: 2500, level: 6 },
            { rank: 6, name: 'Maya Sari', xp: 2450, level: 6 },
            { rank: 7, name: 'Rizky Pratama', xp: 2300, level: 5 },
            { rank: 8, name: 'Nina Astuti', xp: 2150, level: 5 },
            { rank: 9, name: 'Fajar Nugroho', xp: 2000, level: 5 },
            { rank: 10, name: 'Lina Marlina', xp: 1850, level: 4 }
        ]
    };
    
    // Initialize leaderboard
    updateLeaderboard('global');
    
    // Profile Form Submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Profil berhasil diperbarui', 'success');
        });
    }
    
    // Helper Functions
    function processCommand(command) {
        // Add command to output
        addCliLine(`user@tkj:~$ ${command}`);
        
        // Process command
        const cmd = command.toLowerCase().split(' ')[0];
        const args = command.split(' ').slice(1);
        
        switch(cmd) {
            case 'help':
                addCliLine('Perintah yang tersedia:');
                addCliLine('  ping [host]     - Test koneksi ke host');
                addCliLine('  ipconfig        - Tampilkan konfigurasi IP');
                addCliLine('  traceroute [host] - Lacak rute ke host');
                addCliLine('  config ip [ip]  - Konfigurasi IP address');
                addCliLine('  clear           - Bersihkan terminal');
                addCliLine('  help            - Tampilkan bantuan');
                break;
                
            case 'ping':
                if (args.length === 0) {
                    addCliLine('Usage: ping [host]');
                } else {
                    addCliLine(`Pinging ${args[0]} with 32 bytes of data:`);
                    addCliLine('Reply from 192.168.1.1: bytes=32 time=1ms TTL=64');
                    addCliLine('Reply from 192.168.1.1: bytes=32 time=2ms TTL=64');
                    addCliLine('Reply from 192.168.1.1: bytes=32 time=1ms TTL=64');
                    addCliLine('Reply from 192.168.1.1: bytes=32 time=3ms TTL=64');
                    addCliLine('');
                    addCliLine('Ping statistics for 192.168.1.1:');
                    addCliLine('    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)');
                }
                break;
                
            case 'ipconfig':
                addCliLine('Ethernet adapter Ethernet:');
                addCliLine('   Connection-specific DNS Suffix  . : localdomain');
                addCliLine('   Link-local IPv6 Address . . . . . : fe80::1234:5678:90ab:cdef%12');
                addCliLine('   IPv4 Address. . . . . . . . . . . : 192.168.1.100');
                addCliLine('   Subnet Mask . . . . . . . . . . . : 255.255.255.0');
                addCliLine('   Default Gateway . . . . . . . . . : 192.168.1.1');
                break;
                
            case 'traceroute':
                if (args.length === 0) {
                    addCliLine('Usage: traceroute [host]');
                } else {
                    addCliLine(`Tracing route to ${args[0]} over a maximum of 30 hops:`);
                    addCliLine('  1    <1 ms    <1 ms    <1 ms  192.168.1.1');
                    addCliLine('  2     5 ms     4 ms     5 ms  10.0.0.1');
                    addCliLine('  3    15 ms    14 ms    13 ms  203.0.113.1');
                    addCliLine('  4    25 ms    24 ms    23 ms  198.51.100.1');
                    addCliLine('  5    35 ms    34 ms    33 ms  203.0.113.45');
                    addCliLine('Trace complete.');
                }
                break;
                
            case 'config':
                if (args[0] === 'ip' && args[1]) {
                    addCliLine(`Mengkonfigurasi IP address menjadi ${args[1]}`);
                    addCliLine('Konfigurasi berhasil diterapkan');
                    addXP(10, 'CLI Simulation');
                } else {
                    addCliLine('Usage: config ip [ip_address]');
                }
                break;
                
            case 'clear':
                cliOutput.innerHTML = '';
                addCliLine('TKJ Terminal Simulator v1.0');
                addCliLine('Ketik \'help\' untuk melihat daftar perintah');
                break;
                
            default:
                addCliLine(`bash: ${command}: command not found`);
                addCliLine('Ketik \'help\' untuk melihat daftar perintah');
        }
        
        // Scroll to bottom
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }
    
    function addCliLine(text) {
        const line = document.createElement('div');
        line.className = 'cli-line';
        line.textContent = text;
        cliOutput.appendChild(line);
    }
    
    function updateLeaderboard(type) {
        const leaderboardList = document.getElementById('leaderboard-list');
        const data = leaderboardData[type];
        
        leaderboardList.innerHTML = '';
        
        data.forEach(user => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            item.innerHTML = `
                <div class="rank">${user.rank}</div>
                <div class="name">${user.name}</div>
                <div class="xp">${user.xp} XP</div>
                <div class="level">Level ${user.level}</div>
            `;
            leaderboardList.appendChild(item);
        });
    }
    
    function addXP(amount, source) {
        // In a real app, this would update the database
        // For now, we'll just update the UI and show a notification
        const xpValue = document.querySelector('.xp-value');
        const xpBadge = document.querySelector('.xp-badge');
        
        if (xpValue && xpBadge) {
            const currentXP = parseInt(xpValue.textContent);
            const newXP = currentXP + amount;
            
            xpValue.textContent = newXP;
            xpBadge.textContent = `XP: ${newXP}`;
            
            // Update dashboard XP display
            const dashboardXP = document.querySelector('.dashboard-card .xp-value');
            if (dashboardXP) {
                dashboardXP.textContent = newXP;
            }
        }
        
        console.log(`+${amount} XP dari: ${source}`);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        
        if (type === 'success') {
            notification.style.backgroundColor = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.backgroundColor = 'var(--danger-color)';
        } else if (type === 'warning') {
            notification.style.backgroundColor = 'var(--warning-color)';
        } else {
            notification.style.backgroundColor = 'var(--primary-color)';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Initialize any other components
    console.log('TKJ Learning Platform initialized successfully');
});
