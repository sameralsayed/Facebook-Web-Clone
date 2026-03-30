// script.js
$(document).ready(function () {
    // Fake initial stories
    const stories = [
        { name: "You", img: "https://i.pravatar.cc/64?u=samer", active: true },
        { name: "Alex", img: "https://i.pravatar.cc/64?u=alex", active: true },
        { name: "Maria", img: "https://i.pravatar.cc/64?u=maria", active: true },
        { name: "Jordan", img: "https://i.pravatar.cc/64?u=jordan", active: true },
        { name: "Emma", img: "https://i.pravatar.cc/64?u=emma", active: true }
    ];
    
    let storiesHTML = '';
    stories.forEach(story => {
        storiesHTML += `
            <div class="text-center mx-1">
                <div class="position-relative">
                    <img src="${story.img}" alt="${story.name}" class="rounded-circle border border-4 border-primary" width="64" height="64">
                    ${story.active ? `<span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white" style="width:14px;height:14px;"></span>` : ''}
                </div>
                <small class="d-block mt-1 text-truncate">${story.name}</small>
            </div>`;
    });
    $('#storiesContainer').html(storiesHTML);
    
    // Fake contacts
    const contacts = [
        { name: "Emma Watson", online: true },
        { name: "Chris Evans", online: true },
        { name: "Zendaya", online: true },
        { name: "Tom Holland", online: false }
    ];
    
    let contactsHTML = '';
    contacts.forEach(contact => {
        contactsHTML += `
            <div class="d-flex align-items-center px-3 py-2 border-bottom cursor-pointer">
                <img src="https://i.pravatar.cc/32?u=${contact.name}" alt="" class="rounded-circle me-3" width="32" height="32">
                <span class="fw-medium">${contact.name}</span>
                ${contact.online ? `<span class="ms-auto text-success fs-5">●</span>` : ''}
            </div>`;
    });
    $('#contactsContainer').html(contactsHTML);
    
    // Fake initial posts (inspired by real Facebook app features)
    const initialPosts = [
        {
            id: 1,
            avatar: "https://i.pravatar.cc/48?u=alex",
            name: "Alex Rivera",
            time: "2h",
            text: "Just thrifted the coolest vintage jacket in Marketplace! Who else loves hidden gems? 🛍️ #Marketplace",
            image: "https://picsum.photos/id/1015/600/400",
            likes: 142,
            comments: [
                { name: "Maria", text: "That looks amazing!" }
            ]
        },
        {
            id: 2,
            avatar: "https://i.pravatar.cc/48?u=maria",
            name: "Maria Lopez",
            time: "14m",
            text: "Created this Reel with AI stickers – the future is here! What do you think? ✨",
            image: "",
            likes: 87,
            comments: []
        },
        {
            id: 3,
            avatar: "https://i.pravatar.cc/48?u=jordan",
            name: "Jordan Kim",
            time: "5h",
            text: "Joined a new Group about sustainable living. Real people sharing real tips! 🌱 Who's with me?",
            image: "https://picsum.photos/id/201/600/400",
            likes: 234,
            comments: [
                { name: "Emma", text: "Count me in!" }
            ]
        },
        {
            id: 4,
            avatar: "https://i.pravatar.cc/48?u=emma",
            name: "Emma Thompson",
            time: "1d",
            text: "Meta AI just answered my question in seconds. Mind blown! Try asking it anything.",
            image: "",
            likes: 312,
            comments: []
        }
    ];
    
    // Render feed
    function renderFeed(posts) {
        let html = '';
        posts.forEach(post => {
            let imgHTML = post.image ? `<img src="${post.image}" class="card-img-bottom rounded-bottom-3" alt="Post image">` : '';
            
            let commentsHTML = '';
            post.comments.forEach(comment => {
                commentsHTML += `
                    <div class="d-flex align-items-start mb-2">
                        <strong class="me-2">${comment.name}:</strong>
                        <span>${comment.text}</span>
                    </div>`;
            });
            
            html += `
            <div class="card post-card" data-post-id="${post.id}">
                <div class="card-header d-flex align-items-center">
                    <img src="${post.avatar}" alt="" class="rounded-circle me-3" width="40" height="40">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${post.name}</h6>
                        <small class="text-muted">${post.time} • 🌍</small>
                    </div>
                    <i class="bi bi-three-dots fs-4 cursor-pointer"></i>
                </div>
                <div class="card-body">
                    <p class="fs-5">${post.text}</p>
                    ${imgHTML}
                </div>
                <div class="card-footer bg-white border-0">
                    <div class="d-flex justify-content-between small text-muted mb-2">
                        <span id="like-count-${post.id}">${post.likes} likes</span>
                        <span>${post.comments.length} comments</span>
                    </div>
                    <div class="d-flex border-top pt-2">
                        <!-- Like button -->
                        <button onclick="toggleLike(${post.id})" class="like-btn btn btn-light flex-fill border-0 d-flex align-items-center justify-content-center gap-2 text-muted">
                            <i class="bi bi-hand-thumbs-up"></i>
                            <span>Like</span>
                        </button>
                        <!-- Comment button -->
                        <button onclick="focusComment(${post.id})" class="btn btn-light flex-fill border-0 d-flex align-items-center justify-content-center gap-2 text-muted">
                            <i class="bi bi-chat-left-text"></i>
                            <span>Comment</span>
                        </button>
                        <!-- Share -->
                        <button onclick="fakeShare()" class="btn btn-light flex-fill border-0 d-flex align-items-center justify-content-center gap-2 text-muted">
                            <i class="bi bi-share"></i>
                            <span>Share</span>
                        </button>
                    </div>
                    
                    <!-- Comments section -->
                    <div class="mt-3" id="comments-section-${post.id}">
                        ${commentsHTML}
                        <div class="input-group mt-2">
                            <input type="text" id="comment-input-${post.id}" class="form-control border-0 bg-light" placeholder="Write a comment...">
                            <button onclick="addComment(${post.id})" class="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        $('#feedContainer').html(html);
    }
    
    // Initial render
    renderFeed(initialPosts);
    
    // Global posts array for new posts
    window.allPosts = [...initialPosts];
    
    // Create new post
    window.createNewPost = function () {
        const text = $('#postTextarea').val().trim();
        if (!text) {
            alert("Write something before posting! 📝");
            return;
        }
        
        const newPost = {
            id: Date.now(),
            avatar: "https://i.pravatar.cc/48?u=samer",
            name: "Samer Saeid",
            time: "now",
            text: text,
            image: "",
            likes: 0,
            comments: []
        };
        
        window.allPosts.unshift(newPost);
        renderFeed(window.allPosts);
        
        // Clear textarea
        $('#postTextarea').val('');
        
        // Toast feedback
        const toastHTML = `<div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert">
            <div class="d-flex">
                <div class="toast-body">✅ Post published successfully!</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>`;
        $('body').append(toastHTML);
        const toastEl = $('.toast').last();
        const bsToast = new bootstrap.Toast(toastEl[0]);
        bsToast.show();
        setTimeout(() => toastEl.remove(), 4000);
    };
    
    // Toggle like
    window.toggleLike = function (postId) {
        const post = window.allPosts.find(p => p.id === postId);
        if (!post) return;
        
        const btn = $(`.post-card[data-post-id="${postId}"] .like-btn`);
        const countEl = $(`#like-count-${postId}`);
        
        if (btn.hasClass('liked')) {
            btn.removeClass('liked').find('i').removeClass('bi-hand-thumbs-up-fill').addClass('bi-hand-thumbs-up');
            post.likes--;
        } else {
            btn.addClass('liked').find('i').removeClass('bi-hand-thumbs-up').addClass('bi-hand-thumbs-up-fill');
            post.likes++;
        }
        
        countEl.text(`${post.likes} likes`);
    };
    
    // Add comment
    window.addComment = function (postId) {
        const input = $(`#comment-input-${postId}`);
        const commentText = input.val().trim();
        if (!commentText) return;
        
        const post = window.allPosts.find(p => p.id === postId);
        if (!post) return;
        
        post.comments.push({ name: "Samer Saeid", text: commentText });
        
        // Re-render only this post's comments
        let commentsHTML = '';
        post.comments.forEach(c => {
            commentsHTML += `<div class="d-flex align-items-start mb-2"><strong class="me-2">${c.name}:</strong><span>${c.text}</span></div>`;
        });
        
        $(`#comments-section-${postId}`).find('.input-group').before(commentsHTML);
        input.val('');
    };
    
    // Focus comment input
    window.focusComment = function (postId) {
        $(`#comment-input-${postId}`).focus();
    };
    
    // Fake media clicks
    window.fakeMediaClick = function (type) {
        if (type === 'photo') alert("📸 Photo/video picker would open here (demo only)");
        else if (type === 'video') alert("🎥 Reel or video upload simulated");
        else if (type === 'feeling') alert("😊 Feeling/activity selector activated");
    };
    
    // Fake search
    window.fakeSearch = function (e) {
        e.preventDefault();
        const query = $('#searchInput').val().trim();
        if (query) {
            alert(`🔍 Searched for "${query}"\n\n(Results would show interactive Facebook-style cards with Reels, Groups, Marketplace items and Meta AI suggestions)`);
            $('#searchInput').val('');
        }
    };
    
    // Fake share
    window.fakeShare = function () {
        alert("🔗 Post shared to your timeline and friends! (Demo)");
    };
    
    // Fake logout
    window.fakeLogout = function (e) {
        e.preventDefault();
        if (confirm("Log out of this demo Facebook clone?")) {
            location.reload();
        }
    };
    
    console.log('%c✅ Fully functional Facebook web clone ready! Built with ❤️ by SAMER SAEID', 'color:#1877f2; font-weight:bold');
});
