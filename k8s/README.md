# Kubernetes Deployment Guide

## 📁 Kubernetes Manifests

This directory contains all Kubernetes resources for deploying the DevOps Portfolio application.

### 📋 Files Overview

- **`namespace.yaml`** - Isolated namespace for the application
- **`deployment.yaml`** - Application deployment with 2 replicas
- **`service.yaml`** - LoadBalancer service exposing port 80
- **`configmap.yaml`** - Application configuration
- **`ingress.yaml`** - Ingress for domain-based routing with TLS
- **`hpa.yaml`** - Horizontal Pod Autoscaler (2-5 replicas)

---

## 🚀 Quick Start

### 1. **Build and Push Docker Image**

```bash
# Build the image
docker build -t your-registry/portfolio:v1.0 .

# Push to registry (Docker Hub, ECR, GCR, etc.)
docker push your-registry/portfolio:v1.0
```

### 2. **Update Image Reference**

Edit `k8s/deployment.yaml` and update the image:
```yaml
image: your-registry/portfolio:v1.0
```

### 3. **Deploy to Kubernetes**

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Deploy all resources
kubectl apply -f k8s/

# Or deploy individually in order
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## 🔍 Verification

### Check Deployment Status
```bash
# Check all resources in portfolio namespace
kubectl get all -n portfolio

# Check deployment
kubectl get deployment portfolio-deployment -n portfolio

# Check pods
kubectl get pods -n portfolio -o wide

# Check service
kubectl get svc portfolio-service -n portfolio

# Check ingress
kubectl get ingress portfolio-ingress -n portfolio
```

### View Logs
```bash
# Get pod logs
kubectl logs -f deployment/portfolio-deployment -n portfolio

# Follow logs from all pods
kubectl logs -f -l app=portfolio -n portfolio
```

### Check Pod Health
```bash
# Describe pod
kubectl describe pod <pod-name> -n portfolio

# Check events
kubectl get events -n portfolio --sort-by='.lastTimestamp'
```

---

## 🌐 Accessing the Application

### **Via LoadBalancer (Cloud)**
```bash
# Get external IP
kubectl get svc portfolio-service -n portfolio

# Access at: http://<EXTERNAL-IP>
```

### **Via NodePort (Local/On-Prem)**
Change service type to NodePort in `service.yaml`:
```yaml
spec:
  type: NodePort
```
Then access at: `http://<node-ip>:<node-port>`

### **Via Ingress (Domain)**
1. Install Ingress Controller (e.g., nginx-ingress)
2. Update domain in `ingress.yaml`
3. Configure DNS to point to Ingress IP
4. Access at: `https://portfolio.yourdomain.com`

---

## ⚙️ Configuration

### Resource Limits
Adjust in `deployment.yaml`:
```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "256Mi"
    cpu: "200m"
```

### Scaling
Manual scaling:
```bash
kubectl scale deployment portfolio-deployment --replicas=3 -n portfolio
```

Auto-scaling is configured via HPA (2-5 replicas based on CPU/memory).

### Environment Variables
Update `configmap.yaml` to add environment variables.

---

## 🔐 Security Best Practices

### 1. **Use Private Registry**
```bash
# Create Docker registry secret
kubectl create secret docker-registry regcred \
  --docker-server=your-registry.io \
  --docker-username=your-username \
  --docker-password=your-password \
  --docker-email=your-email \
  -n portfolio
```

Add to deployment.yaml:
```yaml
spec:
  imagePullSecrets:
  - name: regcred
```

### 2. **Enable TLS/HTTPS**
Install cert-manager:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

Create ClusterIssuer for Let's Encrypt (already configured in ingress.yaml).

### 3. **Network Policies**
Create network policy to restrict traffic:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: portfolio-netpol
  namespace: portfolio
spec:
  podSelector:
    matchLabels:
      app: portfolio
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 6969
```

---

## 📊 Monitoring

### Metrics Server (for HPA)
```bash
# Check if metrics-server is running
kubectl get deployment metrics-server -n kube-system

# Install if not present
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

### Check HPA Status
```bash
kubectl get hpa portfolio-hpa -n portfolio
kubectl describe hpa portfolio-hpa -n portfolio
```

---

## 🔄 Updates & Rollbacks

### Rolling Update
```bash
# Update image
kubectl set image deployment/portfolio-deployment \
  portfolio=your-registry/portfolio:v2.0 \
  -n portfolio

# Check rollout status
kubectl rollout status deployment/portfolio-deployment -n portfolio

# View rollout history
kubectl rollout history deployment/portfolio-deployment -n portfolio
```

### Rollback
```bash
# Rollback to previous version
kubectl rollout undo deployment/portfolio-deployment -n portfolio

# Rollback to specific revision
kubectl rollout undo deployment/portfolio-deployment --to-revision=2 -n portfolio
```

---

## 🗑️ Cleanup

```bash
# Delete all resources
kubectl delete -f k8s/

# Or delete namespace (removes everything)
kubectl delete namespace portfolio
```

---

## 🎯 Production Checklist

- [ ] Use private container registry
- [ ] Configure resource requests/limits
- [ ] Enable horizontal pod autoscaling
- [ ] Set up ingress with TLS
- [ ] Configure health checks (liveness/readiness)
- [ ] Add network policies
- [ ] Enable monitoring (Prometheus/Grafana)
- [ ] Configure logging (ELK/Loki)
- [ ] Set up backup strategy
- [ ] Document runbooks

---

## 🛠️ Troubleshooting

### Pods Not Starting
```bash
kubectl describe pod <pod-name> -n portfolio
kubectl logs <pod-name> -n portfolio
```

### Service Not Accessible
```bash
kubectl get endpoints portfolio-service -n portfolio
kubectl describe svc portfolio-service -n portfolio
```

### HPA Not Scaling
```bash
kubectl describe hpa portfolio-hpa -n portfolio
kubectl top pods -n portfolio
```

---

## 📞 Support

For issues or questions:
- GitHub: [Shrinidhi972004](https://github.com/Shrinidhi972004)
- Email: shrinidhiupadhyaya00@gmail.com
