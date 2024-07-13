
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

export function AppFooter() {



    return (
        <footer className="footer-container full main-layout">
            <div className="footer-info">
                <h4>©All rights reserved to Yonatan Hershko</h4>
                <div className="footer-links">
                <a href="https://github.com/yonatanhershko" target="_blank" rel="noopener noreferrer"><GitHubIcon style={{ fontSize: '30px' }} /></a>
                <a href="https://www.linkedin.com/in/yonatan-hershko-022718255/" target="_blank" rel="noopener noreferrer"><LinkedInIcon style={{ fontSize: '30px' }} /></a>
                <a href="https://www.instagram.com/yonatan_hershko/" target="_blank" rel="noopener noreferrer"><InstagramIcon style={{ fontSize: '30px' }} /></a>
                </div>
            </div>

        </footer>
    )

}