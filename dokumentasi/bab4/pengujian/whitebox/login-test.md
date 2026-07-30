# Whitebox Testing - Fitur Login

## Referensi Implementasi
- `src/app/login/page.tsx`
- `src/components/views/Login/Login.tsx`
- `src/service/authService.ts`
- `src/types/auth.ts`

## Tabel Source Code (Whitebox)

| no | source code |
|---|---|
| 1 | `useForm<TLogin>({ resolver: zodResolver(loginSchema) })`<br>`// Login.tsx:31-34` |
| 2 | `loginSchema = z.object({ credential: z.string().min(1), password: z.string().min(1) })`<br>`// auth.ts:3-6` |
| 3 | `onSubmit={handleSubmit(onSubmit)}`<br>`// Login.tsx:131` |
| 4 | `setLoading(true); const res = await loginService(data);`<br>`// Login.tsx:43-44` |
| 5 | `return await apiClient.post(API_ROUTE.AUTH.LOGIN, data);`<br>`// authService.ts:6` |
| 6 | `const token = res?.data?.token || ""; const decodedToken = decodeToken(token);`<br>`// Login.tsx:46-47` |
| 7 | `localStorage.setItem("token", token);`<br>`localStorage.setItem("id", decodedToken.id.toString());`<br>`localStorage.setItem("username", decodedToken.username);`<br>`// Login.tsx:49-51` |
| 8 | `if (decodedToken?.role === "USER") { router.push(ROUTE_PATHS.USER.DASHBOARD); } else { router.push(ROUTE_PATHS.ADMIN.DASHBOARD); }`<br>`// Login.tsx:53-57` |
| 9 | `catch (error) { if (axios.isAxiosError(error)) { setError(...) } else if (error instanceof Error) { setError(...) } setOpenModalFailed(true); }`<br>`// Login.tsx:58-65` |
| 10 | `finally { setLoading(false); }`<br>`// Login.tsx:65-67` |
| 11 | `checkIsLoggedIn()` dipanggil pada `useEffect` saat komponen mount<br>`// Login.tsx:89-91` |
| 12 | `if (!token) return;`<br>`if (isTokenValid(token)) { ... if (role.toLowerCase() === "admin") ... else ... }`<br>`// Login.tsx:73-86` |

## Flow Diagram (PlantUML)

- Flowgraph: `dokumentasi/whitebox/flowgraph/login-flowgraph.puml`
- Flowchart: `dokumentasi/whitebox/flowchart/login-flowchart.puml`

## Perhitungan Cyclomatic Complexity

Perhitungan dilakukan berdasarkan flowgraph pada file `dokumentasi/whitebox/flowgraph/login-flowgraph.puml`.

### 1) Metode Predicate Node

Decision/predicate node pada flowgraph:
1. token exists?
2. token valid?
3. role admin?
4. input valid?
5. request success?
6. role USER?
7. axios error?
8. generic Error?

Total predicate node `P = 8`.

Maka:

`V(G) = P + 1 = 8 + 1 = 9`

### 2) Metode Edge dan Node

Berdasarkan flowgraph:
- Jumlah node `N = 25`
- Jumlah edge `E = 32`
- Jumlah komponen terhubung `P = 1`

Maka:

`V(G) = E - N + 2P = 32 - 25 + 2(1) = 9`

### Hasil

Nilai cyclomatic complexity fitur login adalah `9`.
Artinya, minimal diperlukan `9` jalur uji independen untuk mencakup seluruh keputusan logika pada alur login.

## Jalur Uji Whitebox yang Perlu Dicapai

1. Token tidak ada, user login sukses sebagai USER.
2. Token tidak ada, user login sukses sebagai ADMIN.
3. Token tidak ada, login gagal karena Axios error dari API.
4. Token tidak ada, login gagal karena error non-Axios dan bertipe `Error`.
5. Token ada dan valid, role admin -> auto redirect admin dashboard.
6. Token ada dan valid, role user -> auto redirect user dashboard.
7. Token ada tapi tidak valid -> tetap di halaman login.
8. Input form tidak valid (credential/password kosong) -> validasi client-side aktif, request tidak dikirim.
9. Token tidak ada, login gagal karena error non-Axios dan bukan instance `Error` (cabang fallback message).
