
#### <a href="https://medium.com/devopsturkiye/self-managed-argo-cd-app-of-everything-a226eb100cf0">Self managed</a> 
#### Install argocd
```bash
kubectl create ns argocd
helm -n argocd install argocd argocd-install -f argocd-install/values.yaml
```

#### Install argocd command:
```bash
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64

sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
```
#### <a href="https://gitlab.com/devops5114926/gitops/argocd/argocd-applications/-/blob/main/Docs/Webhook-GitLab.md">GitLab webhook</a>


#### Add Cluster:
secrets cluster for argocd
```bash
argocd login argocd-test.tdt.asia $(kubectl get service argocd-server -n argocd --output=jsonpath='{.status.loadBalancer.ingress[0].hostname}') --username admin --password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo) --insecure --grpc-web

argocd cluster add kubernetes-admin@kubernetes ## local domain
```
another way login cli
```bash
argocd login --sso argocd-test.tdt.asia --grpc-web
```

#### <a href="https://gitlab.com/devops5114926/gitops/argocd/argocd-applications/-/blob/main/Docs/Gitlab-SSO-for-Argocd.md">GitLab SSO</a>

#### Secret for argocd access repository

application-secret.yaml
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: argocd-applications
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
stringData:
  url: https://gitlab.*/argocd-applications.git ## Repo URL
  password: <Repository Access token> ## read_repository permission
  username: not-used
```

```bash
kubectl apply -f application-secret.yaml
```