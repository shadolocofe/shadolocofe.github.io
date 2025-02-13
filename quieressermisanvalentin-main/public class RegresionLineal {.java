public class RegresionLineal {
    private double sumaX, sumaY, sumaXY, sumaXCuadrado;
    private int numeroDePuntosDeDatos;

    public RegresionLineal() {
        reiniciar();
    }

    public void agregarPuntoDeDatos(double x, double y) {
        numeroDePuntosDeDatos++;
        sumaX += x;
        sumaY += y;
        sumaXY += x * y;
        sumaXCuadrado += x * x;
    }

    public void reiniciar() {
        sumaX = sumaY = sumaXY = sumaXCuadrado = 0;
        numeroDePuntosDeDatos = 0;
    }

    public double[] calcularCoeficientes() {
        double m = (numeroDePuntosDeDatos * sumaXY - sumaX * sumaY) / (numeroDePuntosDeDatos * sumaXCuadrado - Math.pow(sumaX, 2));
        double b = (sumaY - m * sumaX) / numeroDePuntosDeDatos;
        return new double[]{m, b};
    }
public String obtenerEquacion() {
        double[] coeficientes = calcularCoeficientes();
        return String.format("y = %.2f * x + %.2f", coeficientes[0], coeficientes[1]);
    }

    public static void main(String[] args) {
        RegresionLineal regresion = new RegresionLineal();

        // Añade tus puntos de datos aquí
        regresion.agregarPuntoDeDatos(1, 2);
        regresion.agregarPuntoDeDatos(2, 5);
        regresion.agregarPuntoDeDatos(3, 7);
        regresion.agregarPuntoDeDatos(4, 10);

        System.out.println("Equación: " + regresion.obtenerEquacion());
    }

}