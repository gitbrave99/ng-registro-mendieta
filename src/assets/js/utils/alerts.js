class AllAlerts {
    Result(icon, title) {
        Swal.fire({
            position: 'center',
            icon,
            title,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}
