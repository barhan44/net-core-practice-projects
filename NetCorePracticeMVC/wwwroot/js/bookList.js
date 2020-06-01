let dataTable;

$(document).ready(() => {
    loadDataTable();
});

const loadDataTable = () => {
    dataTable = $('#DT_load').DataTable({
        ajax: {
            url: "/books/getall",
            type: "GET",
            datatype: "json"
        },
        columns: [
            { data: "name", width: "25%" },
            { data: "author", width: "25%" },
            { data: "isbn", width: "25%" },
            {
                data: "id",
                render: (data) => {
                    return `<div class="text-center">
                        <a href="/Books/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            onClick=Delete('/books/Delete?id='+${data})>
                            Delete
                        </a>
                        </div>`;
                }, width: "25%"
            }
        ],
        language: {
            "emptyTable": "no data found"
        },
        width: "100%"
    });
}

const Delete = (url) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "Delete",
                url: url,
                success: (data) => {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }

    });
}