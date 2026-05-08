-- Script de Sincronización de Cursos Vertex
-- Copia y pega este código en el SQL Editor de Supabase para insertar los cursos de ejemplo.

-- 1. Limpiar datos previos si es necesario (Opcional, ten cuidado)
-- DELETE FROM courses WHERE id LIKE 'course-%';

-- 2. Insertar los cursos principales
INSERT INTO courses (id, title, slug, description, thumbnail, price, price_usd, level, duration, published, created_at)
VALUES 
('course-fullstack', 'Desarrollo Web Full Stack', 'desarrollo-web-full-stack', 'HTML, CSS, JavaScript, React, Next.js, Node.js y PostgreSQL con proyectos reales.', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', 249, 69, 'Desde cero', '12 semanas', true, NOW()),

('course-python', 'Python Profesional', 'python-profesional', 'APIs, automatización, IA y scraping con buenas prácticas industriales.', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80', 199, 55, 'Intermedio', '8 semanas', true, NOW()),

('course-sql', 'SQL y Bases de Datos', 'sql-y-bases-de-datos', 'PostgreSQL, modelado, consultas, índices y buenas prácticas para producción.', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80', 149, 42, 'Desde cero', '6 semanas', true, NOW()),

('course-automation', 'FullStack Automation', 'fullstack-automation', 'Sistemas de automatización de extremo a extremo utilizando Python y Node.js.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 279, 78, 'Avanzado', '10 semanas', true, NOW()),

('course-rpa', 'Robotic Process Automation', 'robotic-process-automation', 'Automatización de procesos empresariales con UiPath y bots personalizados.', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80', 219, 61, 'Intermedio', '8 semanas', true, NOW()),

('course-ai-ops', 'AI Deployment Ops', 'ai-deployment-ops', 'Despliegue y monitoreo de modelos de IA en entornos de producción (MLOps).', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80', 329, 92, 'Avanzado', '8 semanas', true, NOW()),

('course-smart-factory', 'Smart Factory 4.0', 'smart-factory-4-0', 'Integración de sistemas IoT y SCADA para la industria conectada.', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80', 349, 97, 'Avanzado', '12 semanas', true, NOW())
ON CONFLICT (id) DO UPDATE 
SET title = EXCLUDED.title, 
    slug = EXCLUDED.slug, 
    description = EXCLUDED.description, 
    thumbnail = EXCLUDED.thumbnail, 
    price = EXCLUDED.price, 
    price_usd = EXCLUDED.price_usd, 
    level = EXCLUDED.level, 
    duration = EXCLUDED.duration, 
    published = EXCLUDED.published;

-- 3. Ejemplo de módulos para un curso (Opcional)
-- INSERT INTO modules (id, course_id, title, position) VALUES 
-- (gen_random_uuid(), 'course-fullstack', 'Introducción al Stack', 1),
-- (gen_random_uuid(), 'course-fullstack', 'Frontend con React', 2);
