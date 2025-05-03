import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/list-blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-zinc-300">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="gdlr-page-title-wrapper">
        <div className="gdlr-page-title-overlay" />
        <div className="gdlr-page-title-container container">
          <h1 className="gdlr-page-title">Vui chơi - Ăn uống - Giải trí</h1>
          <span className="gdlr-page-caption">Cùng Nhà hàng, Quầy bar &amp; Lounge</span>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="gdlr-content">
          <div className="with-sidebar-wrapper">
            <div className="with-sidebar-container container">
              <div className="with-sidebar-left eight columns">
                <div className="with-sidebar-content twelve columns">
                  <section id="content-section-1">
                    <div className="section-container container">
                      <div className="blog-item-wrapper">
                        <div className="blog-item-holder">
                          {blogs.map((blog, index) => (
                            <div className="gdlr-item gdlr-blog-full">
                              <div className="gdlr-ux gdlr-blog-full-ux">
                                  <article
                                    key={index}
                                    className="post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row"
                                  >
                                    <div className="gdlr-standard-style">
                                      <div className="gdlr-blog-thumbnail">
                                        <Link to={`/blog-detail/${blog.id}`}>
                                        <img src={blog.img || "https://via.placeholder.com/300x200"} alt={blog.blog_name} />
                                        </Link>
                                      </div>
                                      <div className="blog-content-wrapper">
                                        <header className="post-header">
                                          <div className="gdlr-blog-info gdlr-info">
                                            <div className="blog-info blog-author">
                                              <i className="fa fa-pencil" />
                                              <Link to={`/blog-detail/${blog.id}`} title="Tác giả">
                                                {blog.author ? blog.author : "Ẩn danh"}
                                              </Link>
                                            </div>
                                            <div className="blog-info blog-category">
                                              <i className="fa fa-folder-open-o" />
                                              <Link to={`/blog-detail/${blog.id}`} rel="tag">
                                                Blog
                                              </Link>
                                              <span className="sep" />
                                            </div>
                                            <div className="clear" />
                                          </div>
                                          <h3 className="gdlr-blog-title">
                                            <Link to={`/blog-detail/${blog.id}`}>{blog.blog_name}</Link>
                                          </h3>
                                          <div className="clear" />
                                        </header>
                                        <div className="gdlr-blog-content">{blog.short_describe}</div>
                                      </div>
                                    </div>
                                  </article>
                              </div>
                            </div>
                          ))}
                          <div className="clear" />
                        </div>
                        {/* #post */}
                      </div>
                    </div>
                  </section></div>
              </div>
              <div className="gdlr-sidebar gdlr-right-sidebar four columns">
                <div className="gdlr-item-start-content sidebar-right-item">
                  <div id="search-3" className="widget widget_search gdlr-item gdlr-widget"><div className="gdl-search-form">
                      <form method="get" id="searchform" action="https://demo.goodlayers.com/hotelmaster/dark/">
                        <div className="search-text" id="search-text">
                          <input type="text" name="s" id="s" autoComplete="off" data-default="Type keywords..." />
                        </div>
                        <input type="submit" id="searchsubmit" defaultValue />
                        <div className="clear" />
                      </form>
                    </div></div><div id="text-2" className="widget widget_text gdlr-item gdlr-widget"><h3 className="gdlr-widget-title">Text Widget</h3><div className="clear" />			<div className="textwidget">Morbi leo risus, porta ac consectetur ac, vest ibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis. </div>
                  </div><div id="gdlr-recent-portfolio-widget-2" className="widget widget_gdlr-recent-portfolio-widget gdlr-item gdlr-widget"><h3 className="gdlr-widget-title">Recent Works</h3><div className="clear" /><div className="gdlr-recent-port-widget"><div className="recent-post-widget"><div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/140H-150x150.jpg" alt="" width={150} height={150} /></a></div><div className="recent-post-widget-content"><div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox/">Thumbnail open lightbox</a></div><div className="recent-post-widget-info"><div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div><div className="clear" /></div></div><div className="clear" /></div><div className="recent-post-widget"><div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox-2/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/156H-150x150.jpg" alt="" width={150} height={150} /></a></div><div className="recent-post-widget-content"><div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox-2/">Thumbnail link to post</a></div><div className="recent-post-widget-info"><div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div><div className="clear" /></div></div><div className="clear" /></div><div className="recent-post-widget"><div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-video-lightbox/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/157H-150x150.jpg" alt="" width={150} height={150} /></a></div><div className="recent-post-widget-content"><div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-video-lightbox/">Open video lightbox</a></div><div className="recent-post-widget-info"><div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div><div className="clear" /></div></div><div className="clear" /></div><div className="clear" /></div></div><div id="recent-comments-3" className="widget widget_recent_comments gdlr-item gdlr-widget"><h3 className="gdlr-widget-title">Recent Comments</h3><div className="clear" /><ul id="recentcomments"><li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/magna-pars-studiorum/#comment-14">Magna pars studiorum</a></li><li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/eiusmod-tempor-incidunt/#comment-12">Eiusmod tempor incidunt</a></li><li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/eiusmod-tempor-incidunt/#comment-11">Eiusmod tempor incidunt</a></li><li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/donec-luctus-imperdiet/#comment-9">Donec luctus imperdiet</a></li><li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/11/12/nihilne-te-nocturnum/#comment-15">Nihilne te nocturnum</a></li></ul></div><div id="tag_cloud-2" className="widget widget_tag_cloud gdlr-item gdlr-widget"><h3 className="gdlr-widget-title">Tag Cloud</h3><div className="clear" /><div className="tagcloud"><a href="https://demo.goodlayers.com/hotelmaster/dark/tag/animal/" className="tag-cloud-link tag-link-11 tag-link-position-1" style={{fontSize: '8pt'}} aria-label="Animal (1 item)">Animal</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/aside/" className="tag-cloud-link tag-link-12 tag-link-position-2" style={{fontSize: '8pt'}} aria-label="Aside (1 item)">Aside</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/audio/" className="tag-cloud-link tag-link-13 tag-link-position-3" style={{fontSize: '11.230769230769pt'}} aria-label="Audio (2 items)">Audio</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/blog/" className="tag-cloud-link tag-link-14 tag-link-position-4" style={{fontSize: '19.666666666667pt'}} aria-label="Blog (8 items)">Blog</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/business/" className="tag-cloud-link tag-link-15 tag-link-position-5" style={{fontSize: '15.179487179487pt'}} aria-label="Business (4 items)">Business</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/gallery-thumbnail/" className="tag-cloud-link tag-link-16 tag-link-position-6" style={{fontSize: '8pt'}} aria-label="Gallery Thumbnail (1 item)">Gallery Thumbnail</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/identity-2/" className="tag-cloud-link tag-link-17 tag-link-position-7" style={{fontSize: '13.384615384615pt'}} aria-label="identity (3 items)">identity</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/life-style/" className="tag-cloud-link tag-link-18 tag-link-position-8" style={{fontSize: '22pt'}} aria-label="Life Style (11 items)">Life Style</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/link/" className="tag-cloud-link tag-link-19 tag-link-position-9" style={{fontSize: '11.230769230769pt'}} aria-label="Link (2 items)">Link</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/news/" className="tag-cloud-link tag-link-20 tag-link-position-10" style={{fontSize: '16.615384615385pt'}} aria-label="News (5 items)">News</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/post-format/" className="tag-cloud-link tag-link-21 tag-link-position-11" style={{fontSize: '15.179487179487pt'}} aria-label="Post format (4 items)">Post format</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/quote/" className="tag-cloud-link tag-link-22 tag-link-position-12" style={{fontSize: '8pt'}} aria-label="Quote (1 item)">Quote</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/safari/" className="tag-cloud-link tag-link-23 tag-link-position-13" style={{fontSize: '8pt'}} aria-label="Safari (1 item)">Safari</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/travel/" className="tag-cloud-link tag-link-24 tag-link-position-14" style={{fontSize: '8pt'}} aria-label="Travel (1 item)">Travel</a>
                      <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/video/" className="tag-cloud-link tag-link-25 tag-link-position-15" style={{fontSize: '8pt'}} aria-label="Video (1 item)">Video</a></div>
                  </div>	</div>
              </div>
              <div className="clear" />
            </div>
          </div>
          <div className="clear" />
        </div>
        <div className="gdlr-sidebar gdlr-right-sidebar four columns">
          <div className="gdlr-item-start-content sidebar-right-item">
            <div id="search-3" className="widget widget_search gdlr-item gdlr-widget">
              <div className="clear" />
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}
export default Blog;