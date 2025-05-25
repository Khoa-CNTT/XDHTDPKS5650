import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Form, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function DetailBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState(null);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // const handleSubmitComment = async (e) => {
  //   e.preventDefault();
  //   if (!newComment.trim()) return;

  //   setSubmitting(true);
  //   setSubmitError(null);

  //   try {
  //     console.log('Đang gửi bình luận:', {
  //       id_blog: id,
  //       text: newComment,
  //       id_parent: replyTo,
  //     });

  //     const res = await axios.post('http://127.0.0.1:8000/api/create-comment', {
  //       id_blog: id,
  //       text: newComment,
  //       id_parent: replyTo,
  //     },{
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });

  //     console.log('Phản hồi từ server:', res);

  //     setNewComment('');
  //     setReplyTo(null);

  //     const res2 = await axios.get(`http://127.0.0.1:8000/api/list-cmt?id_blog=${id}`);
  //     setComments(Array.isArray(res2.data.data) ? res2.data.data : []);
  //   } catch (error) {
  //     console.error('Lỗi khi gửi bình luận:', error);

  //     if (error.response) {
  //       console.error('Response data:', error.response.data);
  //       console.error('Response status:', error.response.status);
  //       console.error('Response headers:', error.response.headers);
  //       setSubmitError(`Lỗi server: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
  //     } else if (error.request) {
  //       console.error('Request đã gửi nhưng không nhận được phản hồi:', error.request);
  //       setSubmitError('Không nhận được phản hồi từ server.');
  //     } else {
  //       console.error('Lỗi khi cấu hình request:', error.message);
  //       setSubmitError(`Lỗi: ${error.message}`);
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    // setSubmitError(null);  <-- không cần nữa

    try {
      console.log('Đang gửi bình luận:', {
        id_blog: id,
        text: newComment,
        id_parent: replyTo,
      });

      const res = await axios.post('http://127.0.0.1:8000/api/create-comment', {
        id_blog: id,
        text: newComment,
        id_parent: replyTo,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('Phản hồi từ server:', res);

      setNewComment('');
      setReplyTo(null);

      const res2 = await axios.get(`http://127.0.0.1:8000/api/list-cmt?id_blog=${id}`);
      setComments(Array.isArray(res2.data.data) ? res2.data.data : []);
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error);

      let message = 'Đã xảy ra lỗi';

      if (error.response) {
        if (
          error.response.status === 404 &&
          error.response.data.message === "Error login!"
        ) {
          message = "Không thể bình luận. Vui lòng đăng nhập!!!";
        } else {
          message = `Lỗi server: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
        }
      } else if (error.request) {
        message = 'Không nhận được phản hồi từ server.';
      } else {
        message = `Lỗi: ${error.message}`;
      }

      Swal.fire({
        icon: 'error',
        title: 'Lỗi khi gửi bình luận',
        text: message,
      });

    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detail-blog/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Không thể tải thông tin blog. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/list-cmt?id_blog=${id}`);
      const commentData = Array.isArray(res.data.data) ? res.data.data : [];
      setComments(commentData);
    } catch (err) {
      console.error("Lỗi lấy bình luận:", err);
      setCommentError("Không thể tải bình luận.");
    } finally {
      setLoadingComments(false);
    }
  };

    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy blog
        </div>
      </div>
    );
  }

  return (
    <>
      {blog.map((item) => (
        <div className="gdlr-page-title-wrapper">
          <div className="gdlr-page-title-overlay" />
          <div className="gdlr-page-title-container container">
            <h1 className="gdlr-page-title">{item.blog_name}</h1>
            <span>_______</span>
          </div>
        </div>
      ))}
      {blog.map((item) => (
        <div data-rocket-location-hash="12223478e47c22d52d874711766d1be6" className="content-wrapper">
        <div data-rocket-location-hash="68c9f52196541754439cedc848b55584" className="gdlr-content">
        <div className="with-sidebar-wrapper">
        <div className="with-sidebar-container container">
        <div className="with-sidebar-left eight columns">
        <div className="with-sidebar-content twelve columns">
        <div className="gdlr-item gdlr-blog-full gdlr-item-start-content">
        <article id="post-859" className="post-859 post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row">
          <div className="gdlr-standard-style">
          <div className="gdlr-blog-thumbnail">
            <Image src={item.img || "frontend/anh/default-room.png"} fluid className="mb-4" alt=""/>
          </div>
          <div className="blog-date-wrapper gdlr-title-font">
              <span className="blog-date-day">3</span>
              <span className="blog-date-month">Dec</span>
          </div>
          <div className="blog-content-wrapper">
          <header className="post-header">
              <div className="gdlr-blog-info gdlr-info">
              <div className="blog-info blog-author"><i className="fa fa-pencil" /><a href="https://demo.goodlayers.com/hotelmaster/dark/author/gdadmin/" title="Posts by John Doe" rel="author">{item.author}</a></div>
              <div className="blog-info blog-comment"><i className="fa fa-comment-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/sedial-eiusmod-tempor/#respond">0</a></div>
              <div className="blog-info blog-category"><i className="fa fa-folder-open-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/category/blog/" rel="tag">Blog</a><span className="sep">,</span> <a href="https://demo.goodlayers.com/hotelmaster/dark/category/fit-row/" rel="tag">Fit Row</a></div>
              <div className="clear" /></div>
              <h1 className="gdlr-blog-title">{item.blog_name}</h1>
              <div className="clear" />
          </header>
          <div className="gdlr-blog-content">
          <p>{item.short_describe}</p>
          <div className="clear" />
          <div className="clear" />
              <div className="gdlr-space" style={{marginTop: '30px'}} />
              <p>{item.detail_describe}</p>
              <div className="clear" /></div>
              </div>
          </div>
        </article>
        <div className="gdlr-social-share gdlr-type-enable">
          <span className="social-share-title">Chia sẻ bài viết:</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" width={32} height={32} />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png" alt="TikTok" width={32} height={32} />
            </a>
            <a href="https://twitter.com/intent/tweet?url=YOUR_URL" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width={32} height={32} />
            </a>
            <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png" alt="Zalo" width={32} height={32} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=&su=YOUR_SUBJECT&body=YOUR_BODY&bcc=" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Gmail" width={32} height={32} />
            </a>
          </div>
          <div className="clear" />
          </div>
          <div className="gdlr-post-author">
          <h3 className="post-author-title">Thông tin người đăng</h3>
          <div className="post-author-avartar"><img alt="" src="https://secure.gravatar.com/avatar/666cee72aa11f8f0b5c21c690cdc7dd9?s=90&d=mm&r=g" srcSet="https://secure.gravatar.com/avatar/666cee72aa11f8f0b5c21c690cdc7dd9?s=180&d=mm&r=g 2x" className="avatar avatar-90 photo" height={90} width={90} decoding="async" style={{opacity: 1}} /></div>
          <div className="post-author-content">
          <h4 className="post-author"><a href="https://demo.goodlayers.com/hotelmaster/dark/author/gdadmin/" title="Posts by John Doe" rel="author">{item.author}</a></h4>
          Một chút mô tả về tác giả.	</div>
          <div className="clear" />
          </div>
          <div className="gdlr-comments">
            <h3>Bình luận ({comments.length})</h3>
            {loadingComments ? (
              <p>Đang tải bình luận...</p>
            ) : commentError ? (
              <div className="alert alert-danger">{commentError}</div>
            ) : comments.length === 0 ? (
              <p>Chưa có bình luận nào.</p>
            ) : (
              <ul className="comment-list">
                {comments
                  .filter(comment => comment.parent === null)
                  .map((comment) => (
                    <li key={comment.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                      <strong>{comment.user}</strong> <br />
                      <small>{comment.created_at}</small>
                      <p>{comment.text}</p>
                      <button className="reply-cmt" onClick={() => setReplyTo(comment.id)}>
                        Trả lời
                      </button>

                      <ul style={{ marginLeft: '20px', listStyleType: 'circle' }}>
                        {comments
                          .filter(c => c.parent === comment.id)
                          .map(reply => (
                            <li key={reply.id} style={{ marginBottom: '10px' }}>
                              <strong>{reply.user}</strong> <br />
                              <small>{reply.created_at}</small>
                              <p>{reply.text}</p>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))
                }
              </ul>
            )}
          </div>
          <div id="comments" className="gdlr-comments-area">
          <div id="respond" className="comment-respond">
          <div id="comments" className="gdlr-comments-area">
            <div id="respond" className="comment-respond">
              <h3 id="reply-title" className="comment-reply-title">
                Bình luận về bài viết
                <small style={{ marginLeft: 15 }}>
                  <a
                    rel="nofollow"
                    id="cancel-comment-reply-link"
                    href="#!"
                    style={{ display: replyTo ? 'inline' : 'none' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setReplyTo(null);
                    }}
                  >
                    Hủy trả lời
                  </a>
                </small>
              </h3>
              <Form
                onSubmit={handleSubmitComment}
                className="comment-form"
                id="commentform"
              >
                <Form.Group className="comment-form-comment">
                  <Form.Control
                    as="textarea"
                    id="comment"
                    name="comment"
                    cols={45}
                    rows={8}
                    aria-required="true"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={submitting}
                    placeholder={
                      replyTo ? 'Viết trả lời bình luận...' : 'Viết bình luận...'
                    }
                  />
                </Form.Group>
                <div className="comment-form-head">
                  <div className="clear" />
                </div>
                {/* {submitError && (
                  <div className="alert alert-danger" style={{ marginBottom: '10px' }}>
                    {submitError}
                  </div>
                )} */}
                <p className="form-submit" style={{ marginTop: 15 }}>
                  <Button
                    type="submit"
                    id="submit"
                    className="submit"
                    disabled={submitting || !newComment.trim()}
                    variant="primary"
                  >
                    {submitting
                      ? 'Đang gửi...'
                      : replyTo
                      ? 'Gửi trả lời'
                      : 'Gửi bình luận'}
                  </Button>
                </p>
              </Form>
            </div>
          </div>
          </div>
          </div></div>
        </div>
        <div className="clear" />
        </div>
        <div className="gdlr-sidebar gdlr-right-sidebar four columns">
        <div className="gdlr-item-start-content sidebar-right-item">
        <div id="search-3" className="widget widget_search gdlr-item gdlr-widget">
        <div className="gdl-search-form">
          <form method="get" id="searchform" action="https://demo.goodlayers.com/hotelmaster/dark/">
              <div className="search-text" id="search-text">
                <input type="text" name="s" id="s" autoComplete="off" data-default="Type keywords..." />
              </div>
              <input type="submit" id="searchsubmit" defaultValue />
              <div className="clear" />
          </form>
          </div>
        </div>
        <div id="text-2" className="widget widget_text gdlr-item gdlr-widget">
        <h3 className="gdlr-widget-title">Text Widget</h3>
        <div className="clear" />
          <div className="textwidget">Morbi leo risus, porta ac consectetur ac, vest ibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis. </div>
        </div>
        <div id="gdlr-recent-portfolio-widget-2" className="widget widget_gdlr-recent-portfolio-widget gdlr-item gdlr-widget">
        <h3 className="gdlr-widget-title">Recent Works</h3>
        <div className="clear" />
        <div className="gdlr-recent-port-widget">
        <div className="recent-post-widget">
        <div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/140H-150x150.jpg" alt="" width={150} height={150} style={{opacity: 1}} /></a></div>
        <div className="recent-post-widget-content">
        <div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox/">Thumbnail open lightbox</a></div>
        <div className="recent-post-widget-info">
          <div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div>
          <div className="clear" /></div>
        </div>
        <div className="clear" /></div>
        <div className="recent-post-widget">
        <div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox-2/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/156H-150x150.jpg" alt="" width={150} height={150} style={{opacity: 1}} /></a></div>
        <div className="recent-post-widget-content">
          <div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-lightbox-2/">Thumbnail link to post</a></div>
          <div className="recent-post-widget-info">
              <div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div>
              <div className="clear" /></div>
          </div>
          <div className="clear" /></div>
          <div className="recent-post-widget">
              <div className="recent-post-widget-thumbnail"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-video-lightbox/"><img src="https://goodlayers.b-cdn.net/hotelmaster/dark/wp-content/uploads/2013/12/157H-150x150.jpg" alt="" width={150} height={150} style={{opacity: 1}} /></a></div>
              <div className="recent-post-widget-content">
                <div className="recent-post-widget-title"><a href="https://demo.goodlayers.com/hotelmaster/dark/portfolio/thumbnail-open-video-lightbox/">Open video lightbox</a></div>
                <div className="recent-post-widget-info">
                    <div className="blog-info blog-date"><i className="fa fa-clock-o" /><a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/04/">04 Dec 2013</a></div>
                    <div className="clear" /></div>
                </div>
                <div className="clear" /></div>
                <div className="clear" /></div>
              </div>
              <div id="recent-comments-3" className="widget widget_recent_comments gdlr-item gdlr-widget">
                <h3 className="gdlr-widget-title">Recent Comments</h3>
                <div className="clear" />
                  <ul id="recentcomments">
                    <li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/magna-pars-studiorum/#comment-14">Magna pars studiorum</a></li>
                    <li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/eiusmod-tempor-incidunt/#comment-12">Eiusmod tempor incidunt</a></li>
                    <li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/eiusmod-tempor-incidunt/#comment-11">Eiusmod tempor incidunt</a></li>
                    <li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/12/03/donec-luctus-imperdiet/#comment-9">Donec luctus imperdiet</a></li>
                    <li className="recentcomments"><span className="comment-author-link">John Doe</span> on <a href="https://demo.goodlayers.com/hotelmaster/dark/2013/11/12/nihilne-te-nocturnum/#comment-15">Nihilne te nocturnum</a></li>
                  </ul>
              </div>
                <div id="tag_cloud-2" className="widget widget_tag_cloud gdlr-item gdlr-widget">
                    <h3 className="gdlr-widget-title">Tag Cloud</h3>
                    <div className="clear" />
                    <div className="tagcloud"><a href="https://demo.goodlayers.com/hotelmaster/dark/tag/animal/" className="tag-cloud-link tag-link-11 tag-link-position-1" style={{fontSize: '8pt'}} aria-label="Animal (1 item)">Animal</a>
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
                        <a href="https://demo.goodlayers.com/hotelmaster/dark/tag/video/" className="tag-cloud-link tag-link-25 tag-link-position-15" style={{fontSize: '8pt'}} aria-label="Video (1 item)">Video</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear" />
              </div>
          </div>
        </div>
        <div className="clear" /></div>
      ))}
    </>
  );
}

export default DetailBlog;

