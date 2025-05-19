<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="{{ '/' }}" class="brand-link">
        <img src="{{ asset('upload/dist/img/VietNam.jpg') }}" alt="Ảnh phòng" class="brand-image img-circle elevation-3"
            style="opacity: .8">
        <span class="brand-text font-weight-light">Khách Sạn</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        @php
            $user = Auth::user();
        @endphp

        @if ($user instanceof \App\Models\User)
            <h5 class="text-light mt-2 mb-5">Chào Admin</h5>
        @elseif ($user instanceof \App\Models\Staff)
            <h5 class="text-light mt-2 mb-5">Chào Nhân viên: {{ $user->name }}</h5>
        @endif


        <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
                <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                    aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-sidebar">
                        <i class="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                @if($user->level == 1 )
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-user-tie"></i>
                        <p>
                            Staff
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/staffs' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Staff</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-user"></i>
                        <p>
                            User
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/users' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>User</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-house"></i>
                        <p>
                            Room
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/categories' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Category Room</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/rooms' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Room</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-cart-shopping"></i>
                        <p>
                            Product
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/cateproducts' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Category Product</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/products' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Product</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @if($user->level == 1 || $user->level == 3)
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-file-invoice-dollar"></i>
                        <p>
                            Invoice
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/invoices' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Invoice</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
                @if($user->level == 1 || $user->level == 3)
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-newspaper"></i>
                        <p>
                            Blog
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/blogs' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Blog</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-brands fa-creative-commons-share"></i>
                        <p>
                            Service
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/services' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Service</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @if($user->level == 1 || $user->level == 3)
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-star"></i>
                        <p>
                            Rate
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/rates' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Rate</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
                @if($user->level == 1 || $user->level == 3)
                <li class="nav-item has-treeview">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fa-solid fa-comment"></i>
                        <p>
                            Comment
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ '/comments' }}" class="nav-link">
                                <i class="fa-solid fa-circle-right nav-icon"></i>
                                <p>Comment</p>
                            </a>
                        </li>
                    </ul>
                </li>
                @endif
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
