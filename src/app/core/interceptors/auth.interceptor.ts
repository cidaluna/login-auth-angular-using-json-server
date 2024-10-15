import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Abordagem funcional utiliza função interceptora, ao invés de uma classe.
 * Interceptors são utilizados para capturar requisições HTTP antes de elas serem enviadas
 * para o servidor e/ou para processar respostas antes de serem entregues ao componente que
 * fez a requisição.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * Clona a requisição original, adiciona um cabeçalho de autorização com um
   * Bearer <token> obtido do localStorage e envia a requisição clonada ao servidor
   * permitindo que o servidor reconheça a requisição como autenticada e
   * forneça o acesso aos recursos protegidos.
   */
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
  return next(clonedRequest);
};
