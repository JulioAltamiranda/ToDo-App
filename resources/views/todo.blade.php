<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- app.css-->
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <title>Todo App</title>
</head>
<body>

    <!-- alert start -->
    <div class="alert">
        <div class="alert-btn-close">
            <i class="fas fa-times"></i>
        </div>
        <div class="alert-content">
            <div class="alert-icon">
                <i class="fas"></i>
            </div>
            <div class="alert-message">
            </div>
        </div>
    </div>
    <!-- alert end -->

    <!-- page todo start -->
    <div class="page-todo">
        <!-- wrapper start -->
        <div class="wrapper">
            <h1>My Todo</h1>
            <!-- card start -->
            <div class="card">
                <h2 class="card-title">Todo List</h2>
                <!-- card content start -->
                <div class="card-content">
                    <div class="flex-content">
                        <div class="tags">
                            <button class="tag tag-pending btn-danger btn-sm active" data-status="0">
                                <span>Pending</span>
                                <i class="fas fa-times"></i>
                            </button>
                            <button class="tag tag-completed btn-success btn-sm active" data-status="1">
                                <span>Completed</span>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <button class="btn-primary btn-icon btn-open-modal">                        
                        <i class="fas fa-plus icon right"></i>
                        <span>Add Todo</span>                        
                    </button>
                     <!-- show by start -->
                    <div class="flex-content show-by">
                        <form action="">
                            <label for="showby">Show by</label>
                            <select name="showby" id="showby" class="input">
                                <option value="">All todos</option>
                                <option value="0">Pending</option>
                                <option value="1">Completed</option>
                            </select>
                        </form>
                    </div>
                     <!-- shoy by end -->
                    <!-- todo list start -->
                    <div class="todo-list">
                        <div class="loader-container">
                            <div class="loader">
                            </div>
                        </div>
                    </div>          
                    <!-- todo list end -->
                    <!-- pagination start -->
                    <div class="pagination-container">
                    </div>
                    <!-- pagination end -->
                </div>
                <!-- card content end -->
            </div>
             <!-- card end -->
        </div>
        <!-- wrapper end -->
    </div>
    <!-- page todo end -->
    
    <!-- modal add todo-->
    <div class="modal-container">
        <div class="modal">
            <div class="flex-content">
                <a href="javascript:void(0)" class="btn-close-modal"><i class="fas fa-times"></i></a>
            </div>
            <h2 class="modal-title">Add todo</h2>
            <div class="modal-content">
                <form action="" class="form-todo">
                    @csrf
                    <input type="hidden" name="todo-id" value="">
                    <div class="form-content">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" class="input w-100">
                    </div>
                    <div class="form-content">
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="input w-100"></textarea>
                    </div>
                    <div class="form-buttons">
                        <button class="btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- modal add todo end -->


    <!-- Fontawesome -->
    <script src="https://kit.fontawesome.com/0ac3a6a222.js" crossorigin="anonymous"></script>
    <!-- app.js -->
    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>